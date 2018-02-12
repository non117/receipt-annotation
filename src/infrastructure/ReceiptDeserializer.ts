import Receipt from "../domain/Receipt";

interface ReceiptJSON {
  image_path: string;
  date: string;
  sum: number;
  shop_name: string;
}

export default class ReceiptDeserializer {
  static execute(receiptJson: ReceiptJSON): Receipt {
    let receipt = Object.create(Receipt.prototype);
    return Object.assign(receipt, receiptJson, {
      imagePath: receiptJson.image_path,
      shopName: receiptJson.shop_name,
    });
  }

  static deserializeFromString(rawJson: string): Array<Receipt> {
    return JSON.parse(rawJson, (key: string, value: any) => {
      if (value instanceof Array) {
        return value.map(ReceiptDeserializer.execute);
      } else {
        return value;
      }
    });
  }
}