const REPOSITORY_CHANGE = "REPOSITORY_CHANGE";
import { EventEmitter } from "events";
import ReceiptList from "../domain/ReceiptList";

export class ReceiptListRepository extends EventEmitter {
  private list: ReceiptList
  constructor() {
    super();
    this.list = null;
  }

  get(): ReceiptList {
    return this.list;
  }

  set(receiptList: ReceiptList) {
    this.list = receiptList;
    this.emit(REPOSITORY_CHANGE);
  }

  onChange(handler: () => void) {
    this.on(REPOSITORY_CHANGE, handler);
  }
}

// singleton
export default new ReceiptListRepository();