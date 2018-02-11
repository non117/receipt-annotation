import Account from "./Account";

export default class Receipt {
  image_path: string;
  date: string;
  sum: number;
  shop_name: string;
  account: Account;

  static fromJSON(receipt_json: string): Receipt {
    return JSON.parse(receipt_json);
  }
}