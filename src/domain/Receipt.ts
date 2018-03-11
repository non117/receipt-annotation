import * as moment from "moment";
import Account from "./Account";

export interface ReceiptObject {
  imagePath: string;
  date: string;
  sum: number;
  memo: string;
  debitAccount: Account;
  creditAccount: Account;
}

export default class Receipt {
  imagePath: string;
  date: moment.Moment;
  sum: number;
  memo: string;
  debitAccount: Account;
  creditAccount: Account;
  static DATE_FORMAT = "YYYY-MM-DD HH:mm Z";

  constructor(receipt: ReceiptObject) {
    this.imagePath = receipt.imagePath;
    this.date = receipt.date ? moment(receipt.date, Receipt.DATE_FORMAT) : moment();
    this.sum = receipt.sum || 0;
    this.memo = receipt.memo;
    this.debitAccount = receipt.debitAccount;
    this.creditAccount = receipt.creditAccount;
  }

  updateReceipt(updated: Partial<Receipt>): Receipt {
    let receipt = Object.create(Receipt.prototype);
    return Object.assign(receipt, this, updated);
  }
}