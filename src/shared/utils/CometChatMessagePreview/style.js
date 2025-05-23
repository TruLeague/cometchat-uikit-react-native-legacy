import { StyleSheet } from "react-native";
import { Colors } from "../../../../../../../src/common/Colors";

export const Styles = StyleSheet.create({
    editPreviewContainerStyle: (style, theme) => {
        return {
            alignSelf: "center",
            borderRadius: 5,
            paddingLeft: 10,
            marginTop: 5,
            marginLeft: 0,
            marginBottom: 5,
            marginRight: 0,
            width: style?.width,
            height: style?.height,
            zIndex: 12,
            borderWidth : 1,
            borderColor : Colors.newGreyBorder,
            borderLeftStyle: style?.border?.borderStyle,
            backgroundColor: style?.backgroundColor || theme?.palette?.getBackgroundColor(),
            backgroundColor: Colors.newBgGreyColor
        };
    },
    previewHeadingStyle: () => {
        return {
            marginBottom: 5,
            paddingTop: 5
        };
    },
    previewTitleStyle: (style, theme) => {
        return {
            ...style?.messagePreviewTitleFont,
            ...theme?.typography?.caption1,
            color: Colors.newTextColor,
            fontWeight: "bold",
            letterSpacing: .5,
        };
    },
    previewSubTitleStyle: (style, theme) => {
        return {
            ...style?.messagePreviewSubtitleFont,
            ...theme?.typography?.subtitle2,
            color: Colors.newTextColor,
            letterSpacing: .5,
            marginBottom: 5,
        };
    },
    previewCloseStyle: () => {
        return {
            position: "absolute",
            top: 5,
            right: 5,
            width: 16,
            height: 16,
        };
    },
    previewCloseIconStyle: (style, theme) => {
        return {
            width: 16,
            height: 16,
            tintColor: style?.closeIconTint || theme?.palette?.getAccent500(),
        };
    },
    leftBar: (style, theme) => {
        return {
            position: "absolute",
            height: "100%",
            width: 3,
            backgroundColor: "lightgrey",
        }
    }
});