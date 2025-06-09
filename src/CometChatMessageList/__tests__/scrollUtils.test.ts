import { createScrollToSpecificMessageById } from '../scrollUtils';

describe('createScrollToSpecificMessageById', () => {
  test('invokes scrollTo on the provided list ref', () => {
    const measureLayout = jest.fn((_node: any, callback: any) => callback(0, 50, 0, 0));
    const scrollTo = jest.fn();
    const messageRefs = { current: new Map<any, any>([['1', { measureLayout }]]) } as any;
    const messageListRef = { current: { getInnerViewNode: () => ({}), scrollTo } } as any;
    const setHighlighted = jest.fn();

    const scrollToSpecificMessageById = createScrollToSpecificMessageById(
      messageRefs,
      messageListRef,
      setHighlighted,
    );

    scrollToSpecificMessageById('1');

    expect(measureLayout).toHaveBeenCalled();
    expect(scrollTo).toHaveBeenCalled();
    expect(setHighlighted).toHaveBeenCalledWith('1');
  });
});
