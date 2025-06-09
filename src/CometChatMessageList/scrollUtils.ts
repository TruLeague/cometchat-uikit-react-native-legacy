/**
 * Utility to generate a scroll handler that scrolls the message list to
 * a specific message and briefly highlights it. The handler can be passed
 * down to message bubble components so they can trigger scrolling on demand.
 */
export const createScrollToSpecificMessageById = (
    messageRefs: React.MutableRefObject<Map<any, any>>,
    messageListRef: React.RefObject<any>,
    setHighlightedMessageId: (id: any | null) => void
) => {
    return (messageId: any) => {
        const messageRef = messageRefs.current.get(messageId);
        if (messageRef && messageListRef.current) {
            setHighlightedMessageId(messageId);
            messageRef.measureLayout(
                messageListRef.current.getInnerViewNode(),
                (x: number, y: number, width: number, height: number) => {
                    messageListRef.current!.scrollTo({
                        y: Math.max(0, y - 20),
                        animated: true,
                    });
                },
                (error: any) => {
                    console.error('Failed to measure message layout:', error);
                }
            );
            setTimeout(() => {
                setHighlightedMessageId(null);
            }, 1500);
        }
    };
};
