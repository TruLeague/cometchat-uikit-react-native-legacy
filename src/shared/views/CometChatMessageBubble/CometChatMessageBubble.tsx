import React, { JSX, useContext } from "react";
import { Image, TouchableOpacity, View, ViewProps } from "react-native";
import { CometChatContext } from "../../CometChatContext";
import { CometChatContextType, BaseStyleInterface } from "../../base";
import { MessageBubbleStyle, MessageBubbleStyleInterface } from "./MessageBubbleStyle";
import { memo } from "react";
import { MessageBubbleAlignmentType } from "../../base/Types";
import { Icons } from "../../../../../../../src/assets/Images";
import { Colors } from "../../../../../../../src/common/Colors";
import { useDispatch, useSelector } from "react-redux";
import { setSavedMessagesData } from "../../../../../../../src/redux/action/SavedMessageAction";
import * as AmbassadorServices from '../../../../../../../src/services/prospect/ambassadors/AmbassadorsServices'

export interface CometChatMessageBubbleInterface {
    /**
     * The id of the message bubble.
     * @type string
     */
    id: string,
    /**
     * The leading view of the message bubble.
     * @type () => JSX.Element
     */
    LeadingView?: () => JSX.Element | null,
    /**
     * The header view of the message bubble.
     * @type () => JSX.Element
     */
    HeaderView?: () => JSX.Element | null,
    /**
     * The status info view of the message bubble.
     * @type () => JSX.Element
     */
    StatusInfoView?: () => JSX.Element | null,
    /**
     * The reply view of the message bubble.
     * @type () => JSX.Element
     */
    ReplyView?: () => JSX.Element | null,
    /**
     * The bottom view of the message bubble.
     * @type () => JSX.Element
     */
    BottomView?: () => JSX.Element | null,
    /**
     * The content view of the message bubble.
     * @type () => JSX.Element
     */
    ContentView?: () => JSX.Element | null,
    /**
     * The thread view of the message bubble.
     * @type () => JSX.Element
     */
    ThreadView?: () => JSX.Element | null,
    /**
     * The footer view of the message bubble.
     * @type () => JSX.Element
     */
    FooterView?: () => JSX.Element | null,
    /**
     * The alignment of the message bubble.
     * @type MessageBubbleAlignmentType
     */
    alignment?: MessageBubbleAlignmentType,
    /**
     * The style of the message bubble.
     * @type BaseStyleInterface
     */
    style?: MessageBubbleStyleInterface,
    messageObject?: any,
    type?: string,
    group?: any,
    user?: any,
    loggedInUser?: any
}

export const CometChatMessageBubble = memo(({
    HeaderView,
    StatusInfoView,
    ReplyView,
    ContentView,
    FooterView,
    LeadingView,
    BottomView,
    ThreadView,
    alignment = 'left',
    id,
    style,
    messageObject,
    type,
    group,
    user,
    loggedInUser
}: CometChatMessageBubbleInterface ) => {

    const {theme} = useContext<CometChatContextType>(CometChatContext);

    const _style = new MessageBubbleStyle({
        backgroundColor: theme?.palette.getAccent100(),
        ...style
    });

    const {
        backgroundColor,
        border,
        borderRadius,
        height,
        width,
        alignSelf
    } = _style;

    const dispatch = useDispatch()

    const savedMessaesOfAmbassadors = useSelector((state: any) => {
        return state.savedMsgReducer.savedMessageArr;
    });

    const checkMessageIdInArray = (message_id: any) => {
        return savedMessaesOfAmbassadors.some((item: any) => item.message_id == message_id);
    };


    const getSavedConversation = async (loadingFlag: boolean = true) => {
        try {
            let res: any = await AmbassadorServices.get_saved_conversation();

            if (res.statusCode == 200) {
                dispatch(setSavedMessagesData(res.data))
            }
            else {
                dispatch(setSavedMessagesData([]))
            }

        } catch (error) {
            console.log("error while fetching saved conversation", error)
        }
    }

    const saveConversationMessage = (id: any, message: any) => {
        AmbassadorServices.saveConversation(id, message).then((res: any) => {
            if (res.statusCode == 200) {
                getSavedConversation()
            }
        }).catch((err: any) => {
            console.log("error in saving notes:", err);
        })
    }
    return (
        <View style={{
            width: "100%",
            alignItems: alignment == "right" ?
                "flex-end" :
                alignment == "left" ?
                    "flex-start" :
                    alignment
        }}>
            <View style={{
                height, flexDirection: "row",
                alignItems: "center",
            } as ViewProps}>
                {
                    LeadingView && type == "text" && alignment == "right" && (group == undefined && loggedInUser?.role == "ambassador" && (user.getRole() == "prospect" || user.getRole() == "ambassador")) &&
                    <TouchableOpacity
                        disabled={checkMessageIdInArray(messageObject.rawMessage?.id)}
                        accessible
                        accessibilityLabel={checkMessageIdInArray(messageObject.rawMessage?.id) ? `This message is already saved`  :`Save message ${messageObject.getText()}`}
                        accessibilityRole='button'
                        accessibilityHint={ checkMessageIdInArray(messageObject.rawMessage?.id) ? 'Double tap to save this message' : ""}
                        onPress={() => { saveConversationMessage(messageObject.rawMessage?.id, messageObject.rawMessage.text) }}
                        style={{ height: 42, width: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.newBgGreyColor, marginRight: 5 }}
                    >
                        <Image source={Icons.IcSave} style={{ height: 22, width: 22 }}
                            tintColor={checkMessageIdInArray(messageObject.rawMessage?.id) ? Colors.green : Colors.newTextColor}
                        />
                    </TouchableOpacity>
                }
                <View style={{marginStart: 4, width, maxWidth: "80%"} as ViewProps}>
                    {
                        HeaderView && <HeaderView />
                    }
                    {
                        ReplyView && <ReplyView />
                    }
                    <View style={{
                            ...border,
                            borderRadius,
                            backgroundColor,
                            ...(alignSelf && { alignSelf })
                        } as ViewProps} >
                        {
                            ContentView && <ContentView />
                        }
                        {
                            StatusInfoView && <StatusInfoView />
                        }
                        {
                            BottomView && <BottomView />
                        }
                    </View>
                    {
                        FooterView && <FooterView />
                    }
                    {
                        ThreadView && <ThreadView />
                    }
                </View>
            </View>

        </View>
    )
})