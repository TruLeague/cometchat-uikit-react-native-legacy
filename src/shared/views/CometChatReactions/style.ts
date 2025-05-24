import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../../../src/common/Colors';

export const Styles = StyleSheet.create({
  messageReactionListStyle: {
    marginTop: -3,
    flexDirection: 'row',
    alignItems: 'center',
    padding : 5,
    borderRadius : 25,
  },
  reactionListStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    color: Colors.newTextColor,
    marginVertical: 0,
    padding: 0,
  },
  messageAddReactionStyle: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 22,
    width: 30,
    marginHorizontal: 5,
  },
  emojiButtonStyle: {
    padding: 0,
  },
  messageReactionsStyle: {
   alignItems: 'center',
   justifyContent: 'space-between',
   paddingVertical: 2,
   paddingHorizontal: 3,
   borderRadius: 20,
  },
  reactionCountStyle: {
    paddingRight: 2,
    paddingLeft: 4,
  },
});
