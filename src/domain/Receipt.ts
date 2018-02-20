import Account from "./Account";

export interface ReceiptArgs {
  date: string;
  sum: string;
  account: Account;
}

export default class Receipt {
  imagePath: string;
  date: string;
  sum: number;
  shopName: string;
  account: Account;

  updateReceipt(updated: Partial<ReceiptArgs>): Receipt {
    let receipt = Object.create(Receipt.prototype);
    return Object.assign(receipt, this, updated);
  }
}