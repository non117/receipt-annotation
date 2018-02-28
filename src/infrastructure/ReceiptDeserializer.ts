import Receipt from "../domain/Receipt";

export default class ReceiptDeserializer {
  static deserializeFromString(rawJson: string): Array<Receipt> {
    return JSON.parse(rawJson, (key: string, value: any) => {
      if (value instanceof Array) {
        return value.map(receipt => new Receipt(receipt));
      } else {
        return value;
      }
    });
  }
}