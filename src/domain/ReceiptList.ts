import Receipt, { ReceiptArgs } from "./Receipt";

export default class ReceiptList {
  private _receipts: Array<Receipt>;
  currentIndex: number;

  constructor() {
    this._receipts = [];
    this.currentIndex = 0;
  }

  getCurrent(): Receipt {
    return this._receipts[this.currentIndex];
  }

  canMoveNext(): boolean {
    return this.currentIndex !== this._receipts.length - 1;
  }

  canMovePrev(): boolean {
    return this.currentIndex !== 0;
  }

  moveNext() {
    if (this.canMoveNext()) this.currentIndex++;
  }

  movePrev() {
    if (this.canMovePrev()) this.currentIndex--;
  }

  replace(receipts: Array<Receipt>) {
    this._receipts = receipts;
  }

  updateReceipt(updated: Partial<ReceiptArgs>) {
    const newReceipt = this.getCurrent().updateReceipt(updated);
    this._receipts[this.currentIndex] = newReceipt;
  }
}