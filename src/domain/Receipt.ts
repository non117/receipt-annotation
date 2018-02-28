import * as moment from "moment";
import Account from "./Account";

export interface ReceiptObject {
  imagePath: string;
  date: string;
  sum: number;
  shopName: string;
}

export default class Receipt {
  imagePath: string;
  date: moment.Moment;
  sum: number;
  shopName: string;
  account: Account;

  constructor(receipt: ReceiptObject) {
    this.imagePath = receipt.imagePath;
    this.date = receipt.date ? moment(receipt.date) : moment();
    this.sum = receipt.sum || 0;
  }

  updateReceipt(updated: Partial<Receipt>): Receipt {
    let receipt = Object.create(Receipt.prototype);
    return Object.assign(receipt, this, updated);
  }
}