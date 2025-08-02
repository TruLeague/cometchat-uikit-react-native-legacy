// MessageListUtils.ts
import { CometChat } from "@cometchat/chat-sdk-react-native";

// Create a singleton to store the reference to the function
class MessageListUtilsClass {
  private _scrollToSpecificMessageById: ((messageId: any) => void) | null = null;

  // Method to set the function reference
  setScrollToSpecificMessageById(fn: (messageId: any) => void) {
    this._scrollToSpecificMessageById = fn;
  }

  // Method to call the function
  scrollToSpecificMessageById(messageId: any) {
    if (this._scrollToSpecificMessageById) {
      this._scrollToSpecificMessageById(messageId);
    } else {
      console.warn('scrollToSpecificMessageById function is not initialized yet');
    }
  }
}

// Export a singleton instance
export const MessageListUtils = new MessageListUtilsClass();