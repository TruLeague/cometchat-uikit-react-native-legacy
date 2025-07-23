//@ts-ignore
import { View } from 'react-native';
import React, { useEffect, useRef } from 'react';
//@ts-ignore
import { ICONS } from './resources';
//@ts-ignore
import { CometChat } from '@cometchat/chat-sdk-react-native';
import {
  CometChatList,
  CometChatListActionsInterface,
  CometChatListProps,
  CometChatListStylesInterface,
  CometChatOptions,
  CometChatUiKitConstants,
} from '../shared';
import { localize, ImageType } from '../shared';
import { CometChatGroupsEvents } from '../shared/events';
import { CometChatUIEventHandler } from '../shared/events/CometChatUIEventHandler/CometChatUIEventHandler';
import { MessageTypeConstants } from '../shared/constants/UIKitConstants';
import { CommonUtils } from '../shared/utils/CommonUtils';

export interface CometChatBannedMembersInterface
  extends Omit<
    CometChatListProps,
    'requestBuilder' | 'listStyle' | 'title' | 'listItemKey' | 'options'
  > {
  bannedMembersRequestBuilder?: CometChat.BannedMembersRequestBuilder;
  group: CometChat.Group;
  bannedMemberStyle?: CometChatListStylesInterface;
  unbanIcon?: ImageType;
  title?: string;
  onSelection?: (list: CometChat.User[]) => void;
  onItemPress?: (user: CometChat.User) => void;
  onItemLongPress?: (user: CometChat.User) => void;
  /**
   *
   *
   * @description function which returns an array of CometChatOptions
   */
  options?: (user: CometChat.User) => Array<CometChatOptions>;
}

export const CometChatBannedMembers = (
  props: CometChatBannedMembersInterface
) => {
  const userListenerId = 'userStatus_' + new Date().getTime();

  const {
    group,
    bannedMembersRequestBuilder,
    bannedMemberStyle,
    unbanIcon,
    onError,
    ...newProps
  } = props;

  const defaultBannedMembersRequestBuilder = group
    ? new CometChat.BannedMembersRequestBuilder(group?.['guid']).setLimit(20)
    : undefined;

  const listRef = useRef<CometChatListActionsInterface>(null);
  const loggedUserRef = useRef<CometChat.User | null | any>(null);
  const unbaned = (uid: any) => {
    CometChat.unbanGroupMember(group['guid'], uid).then(
      (response: any) => {
        let user: any = listRef.current?.getListItem(uid);

        let action: CometChat.Action = new CometChat.Action(
          group['guid'],
          MessageTypeConstants.groupMember,
          CometChat.RECEIVER_TYPE.GROUP,
          CometChat.CATEGORY_ACTION as CometChat.MessageCategory
        );
        action.setAction(CometChatUiKitConstants.groupMemberAction.UNBANNED)
        action.setActionBy(loggedUserRef.current);
        action.setMessage(`${loggedUserRef.current['name']} unbanned ${user['name']}}`)
        action.setActionFor(group);
        action.setActionOn(user)
        action.setSender(loggedUserRef.current);

        CometChatUIEventHandler.emitGroupEvent(
          CometChatGroupsEvents.ccGroupMemberUnBanned,
          {
            kickedUser: user,
            kickedBy: loggedUserRef.current,
            message: action, //Note: will add after the discusstion
            kickedFrom: group,
          }
        );
        listRef.current?.removeItemFromList(uid);
        console.log('Group member unbanned successfully', response);
      },
      (error: any) => {
        console.log('Group member unbanning failed with error', error);
        onError && onError(error);
      }
    );
  };

  useEffect(() => {
    CometChat.getLoggedinUser().then(
      (loggedUser: CometChat.User | any) => {
        loggedUserRef.current = loggedUser;
      },
      (error: CometChat.CometChatException) => {
        onError && onError(error);
      }
    );
  }, []);

  useEffect(() => {
    CometChat.addUserListener(
      userListenerId,
      new CometChat.UserListener({
        onUserOnline: (onlineUser: any) => {
          /* when someuser/friend comes online, user will be received here */
          let item = listRef.current?.getListItem(onlineUser.uid);
          if (item) {
              let updatedConversation = CommonUtils.clone(item) as CometChat.User;
              updatedConversation.setStatus(onlineUser.status);
              listRef.current?.updateList(updatedConversation);
          }
        },
        onUserOffline: (offlineUser: any) => {
          /* when someuser/friend went offline, user will be received here */
        let item = listRef.current?.getListItem(offlineUser.uid);
          if (item) {
              let updatedConversation = CommonUtils.clone(item) as CometChat.User;
              updatedConversation.setStatus(offlineUser.status);
              listRef.current?.updateList(updatedConversation);
          }
        },
      })
    );
    return () => CometChat.removeUserListener(userListenerId);
  }, []);

  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <CometChatList
        ref={listRef}
        title={localize('BANNED_MEMBERS')}
        showBackButton
        hideSeparator
        requestBuilder={bannedMembersRequestBuilder ?? defaultBannedMembersRequestBuilder}
        listItemKey="uid"
        options={() => [
          {
            id: 'banned',
            icon: unbanIcon ? unbanIcon : ICONS.CLEAR,
            onPress: unbaned,
          },
        ]}
        listStyle={bannedMemberStyle}
        {...newProps}
      />
    </View>
  );
};
