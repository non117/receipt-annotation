import Receipt from "./Receipt";

export default class ReceiptList {
  private _receipts: Array<Receipt>;
  currentIndex: number;
  length: number;

  constructor(receipts: Array<Receipt>) {
    this._receipts = receipts;
    this.length = receipts.length;
    this.currentIndex = 0;
  }

  getUsable(): Array<Receipt> {
    return this._receipts; // FIXME
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

  updateReceipt(updated: Partial<Receipt>) {
    const newReceipt = this.getCurrent().updateReceipt(updated);
    this._receipts[this.currentIndex] = newReceipt;
  }
}