//@ts-ignore
import {
  View,
  TextInput,
  TextStyle,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
  Platform,
} from 'react-native';
import React, { RefObject, useContext } from 'react';
import { styles } from './styles';
import { FontStyleInterface } from '../../base';
import { localize } from '../../resources/CometChatLocalize';
import { CometChatContext } from '../../CometChatContext';
import { CometChatContextType } from '../../base/Types';
import { TextInputStyle } from '../CometChatTextInput/TextInputStyle';
import { Colors } from '../../../../../../../src/common/Colors';

export interface CometChatMessageInputStyleInterface {
  baseStyle?: StyleProp<ViewStyle>;
  inputBackground?: string;
  dividerTint?: string;
  textFont?: FontStyleInterface;
  textColor?: string;
  placeholderTextColor?: string;
  placeholderTextFont?: FontStyleInterface;
}
export interface CometChatMessageInputInterface {
  /**
   *
   *
   * @type {string}
   * @description text for the input
   */
  text?: string;
  /**
   *
   *
   * @type {string}
   * @description placeholder text
   */
  placeHolderText?: string;
  /**
   *
   *
   * @description callback when input state changes
   */
  onChangeText?: (arg0: string) => void;
  /**
   *
   *
   * @type {CometChatMessageInputStyleInterface}
   * @description custom styles for CometChatMessageInput
   */
  style?: CometChatMessageInputStyleInterface;
  /**
   *
   *
   * @type {number}
   * @description max height for the input
   */
  maxHeight?: number;
  /**
   *
   *
   * @type {React.FC}
   * @description React component for Secondary button
   */
  SecondaryButtonView?: React.FC;
  /**
   *
   *
   * @type {React.FC}
   * @description React component for Auxiliary button
   */
  AuxiliaryButtonView?: React.FC;
  /**
   *
   *
   * @type {('left' | 'right')}
   * @description Placement for Auxiliary button
   */
  auxiliaryButtonAlignment?: 'left' | 'right';
  /**
   *
   *
   * @type {React.FC}
   * @description React component for Primary button
   */
  PrimaryButtonView?: React.FC;
  /**
   *
   *
   * @description callback for onSelectionChange
   */
  onSelectionChange?: (
    e: NativeSyntheticEvent<TextInputSelectionChangeEventData>
  ) => void;
  /**
   *
   *
   * @type {RefObject<any>}
   * @description ref of {TextInput}
   */
  messageInputRef?: RefObject<any>;
}
export const CometChatMessageInput = (
  props: CometChatMessageInputInterface
) => {
  const { theme } = useContext<CometChatContextType>(CometChatContext);
  const {
    onChangeText,
    maxHeight,
    SecondaryButtonView,
    AuxiliaryButtonView,
    PrimaryButtonView,
    onSelectionChange,
    messageInputRef,
    placeHolderText = localize('ENTER_YOUR_MESSAGE_HERE'),
    auxiliaryButtonAlignment = 'right',
    style = {},
    text = '',
  } = props;

  return (
    <View
      style={{
        backgroundColor: style?.inputBackground ?? theme.palette.getAccent100(),
        marginHorizontal: 8,
        borderRadius: 8,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: text?.length  == 0 ? 'center' :'flex-end',
        paddingVertical: 5,
      }}
    >
      {SecondaryButtonView && text?.length  == 0 && <SecondaryButtonView />}

      <TextInput
        ref={messageInputRef}
        style={
          [
            styles.textInput,
            {
              color: style?.textColor ?? theme.palette.getAccent(),
              height: undefined, // allow multiline to grow
              minHeight : 40,
              maxHeight : 100,
              flex : 1 ,
              marginHorizontal : 5,
              borderWidth: 1,
              backgroundColor : Colors.newBgGreyColor,
              borderColor : Colors.newGreyBorder,
              borderRadius : 25,
              textAlignVertical: 'center', // important for Android
              paddingVertical: Platform.OS === 'ios' ? 12 : 8,
              paddingTop: Platform.OS === 'ios' ? 12 :4,
              paddingHorizontal: 10
            },
            text?.length
              ? style?.textFont ?? theme.typography.body
              : style?.placeholderTextFont ?? theme.typography.body,
          ] as TextInputStyle
        }
        onChangeText={onChangeText}
        placeholderTextColor={
          style?.placeholderTextColor
            ? style?.placeholderTextColor
            : theme.palette.getAccent600()
        }
        multiline
        textAlignVertical="center"
        autoCorrect={true}
        placeholder={placeHolderText}
        onSelectionChange={onSelectionChange}
      >
        {text}
      </TextInput>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 6,
          borderTopWidth: 1,
          borderTopColor: style?.dividerTint
            ? style.dividerTint
            : theme.palette.getAccent200(),
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {SecondaryButtonView && <SecondaryButtonView />}
          {text?.length  == 0 && auxiliaryButtonAlignment === 'left' && AuxiliaryButtonView && (
            <AuxiliaryButtonView />
          )}
        </View>
        <View style={{ flexDirection: 'row' }}>
          { text?.length  == 0 && auxiliaryButtonAlignment === 'right' && AuxiliaryButtonView &&  (
            <AuxiliaryButtonView />
          )}
          {(text?.length > 0 || text?.length == undefined) && PrimaryButtonView && <PrimaryButtonView />}
        </View>
      </View>
    </View>
  );
};
