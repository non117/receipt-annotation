import * as moment from "moment";
import Account from "./Account";
import Line from "./Line";

export interface ReceiptObject {
  imagePath: string;
  date: moment.Moment;
  sum: number;
  memo: string;
  debitAccount: Account;
  creditAccount: Account;
  ignored: boolean;
  lines: Array<Line>;
}

export default class Receipt {
  imagePath: string;
  date: moment.Moment;
  sum: number;
  memo: string;
  debitAccount: Account;
  creditAccount: Account;
  ignored: boolean;
  lines: Array<Line>;
  //static DATE_FORMAT = "YYYY-MM-DD HH:mm Z";

  constructor(receipt: ReceiptObject) {
    Object.assign(this, receipt);
  }

  updateReceipt(updated: Partial<Receipt>): Receipt {
    let receipt = Object.create(Receipt.prototype);
    return Object.assign(receipt, this, updated);
  }
}