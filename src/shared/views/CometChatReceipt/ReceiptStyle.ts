export interface ReceiptStyleInterface {
    height?: string | number;
    width?: string | number;
    tintColor?: string
    waitIconTint?: string;
    sentIconTint?: string;
    deliveredIconTint?: string;
    readIconTint?: string;
    errorIconTint?: string;
}

export class ReceiptStyle {
    height?: string | number;
    width?: string | number;
    tintColor?: string
    waitIconTint?: string;
    sentIconTint?: string;
    deliveredIconTint?: string;
    readIconTint?: string;
    errorIconTint?: string;
    constructor(props: ReceiptStyleInterface) {
      const {
        height,
        width,
        tintColor,
        waitIconTint,
        sentIconTint,
        deliveredIconTint,
        readIconTint,
        errorIconTint
      } = props;
      this.height = height;
      this.width = width;
      this.tintColor = tintColor;
      this.waitIconTint = waitIconTint;
      this.sentIconTint = sentIconTint;
      this.deliveredIconTint = deliveredIconTint;
      this.readIconTint = readIconTint;
      this.errorIconTint = errorIconTint;
    }
}