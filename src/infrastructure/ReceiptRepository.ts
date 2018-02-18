import Receipt from "../domain/Receipt";

export class ReceiptRepository {
  private db: Array<Receipt>
  constructor() {
    this.db = [];
  }

  get(index: number): Receipt {
    return this.db[index];
  }

  set(index: number, receipt: Receipt) {
    this.db[index] = receipt;
  }

  replace(receipts: Array<Receipt>) {
    this.db = receipts;
  }
}

// singleton
export default new ReceiptRepository();