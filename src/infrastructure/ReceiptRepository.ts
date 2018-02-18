const REPOSITORY_CHANGE = "REPOSITORY_CHANGE";
import { EventEmitter } from "events";
import Receipt from "../domain/Receipt";

export class ReceiptRepository extends EventEmitter {
  private db: Array<Receipt>
  constructor() {
    super();
    this.db = [];
  }

  get(index: number): Receipt {
    return this.db[index];
  }

  set(index: number, receipt: Receipt) {
    this.db[index] = receipt;
    this.emit(REPOSITORY_CHANGE);
  }

  replace(receipts: Array<Receipt>) {
    this.db = receipts;
    this.emit(REPOSITORY_CHANGE);
  }

  onChange(handler: () => void) {
    this.on(REPOSITORY_CHANGE, handler);
  }
}

// singleton
export default new ReceiptRepository();