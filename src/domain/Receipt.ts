import Account from "./Account";

interface ReceiptJSON {
  image_path: string;
  date: string;
  sum: number;
  shop_name: string;
}

export default class Receipt {
  imagePath: string;
  date: string;
  sum: number;
  shopName: string;
  account: Account;

  static fromJSON(receiptJson: ReceiptJSON): Receipt {
    let receipt = Object.create(Receipt.prototype);
    return Object.assign(receipt, receiptJson, {
      imagePath: receiptJson.image_path,
      shopName: receiptJson.shop_name,
    });
  }
}