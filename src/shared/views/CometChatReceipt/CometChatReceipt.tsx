import React, { useContext } from 'react';
//@ts-ignore
import { Image, ImageStyle } from 'react-native';
import { CometChatContextType, ImageType } from '../../base';
import { ICONS } from './resources';
import styles from './style';
import { CometChatContext } from '../../CometChatContext';

/**
 *
 * CometChatReceipt is a component used to display the status of a message by a custom symbol.
 * This component returns the appropriate symbol depending upon the message status and can be customised.
 *
 * @version 1.0.0
 * @author CometChat
 *
 */
export interface CometChatReceiptInterface {
  waitIcon?: ImageType;
  sentIcon?: ImageType;
  deliveredIcon?: ImageType;
  readIcon?: ImageType;
  errorIcon?: ImageType;
  receipt?: 'SENT' | 'DELIVERED' | 'READ' | 'ERROR' | 'WAIT' | string;
  style?: {
    height?: string | number;
    width?: string | number;
    tintColor?: string;
    waitIconTint?: string;
    sentIconTint?: string;
    deliveredIconTint?: string;
    readIconTint?: string;
    errorIconTint?: string;
  }
}

export const CometChatReceipt = (props: CometChatReceiptInterface) => {
  const {
    style,
    waitIcon = ICONS.WAITING,
    sentIcon = ICONS.GREY_TICK,
    deliveredIcon = ICONS.GREY_DOUBLE_TICK,
    readIcon = ICONS.BLUE_DOUBLE_TICK,
    errorIcon = ICONS.ERROR_TICK,
    receipt = null,
  } = props;

  const { theme } = useContext<CometChatContextType>(CometChatContext);

  const _style = {
    ...style,
    height: style?.height || 10,
    width: style?.width || 14,
  };

  const { height, width } = _style;

  let icon: any = null;
  let imageSource: any = null;
  let tintColor = style?.tintColor;

  switch (receipt) {
    case 'SENT':
      icon = sentIcon;
      tintColor = style?.sentIconTint;
      break;
    case 'DELIVERED':
      icon = deliveredIcon;
      tintColor = style?.deliveredIconTint;
      break;
    case 'READ':
      icon = readIcon;
      tintColor = style?.readIconTint;
      break;
    case 'ERROR':
      icon = errorIcon;
      tintColor = style?.errorIconTint;
      break;
    case 'WAIT':
      icon = waitIcon;
      tintColor = style?.waitIconTint;
      break;

    default:
      break;
  }

  if (icon) {
    if (typeof icon === 'string') {
      imageSource = { uri: icon };
    } else if (typeof icon === 'number') {
      imageSource = icon;
    }
    return <Image source={imageSource} style={[styles.tickImageStyle, { tintColor: tintColor || style?.tintColor, width, height }] as ImageStyle} />;
  }
  return null;
};
