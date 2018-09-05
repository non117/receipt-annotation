import ReceiptList from "../domain/ReceiptList";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";
import { ipcRenderer, IpcMessageEvent } from "electron";

export class LoadReceiptCacheFactory {
  static create() {
    return new LoadReceiptCache(receiptListRepository);
  }
}

export class LoadReceiptCache {
  private receiptListRepository: ReceiptListRepository;

  constructor(receiptListRepository: ReceiptListRepository) {
    this.receiptListRepository = receiptListRepository;
  }

  execute() {
    ipcRenderer.send("requestLoadReceiptCache");
    ipcRenderer.on("responseLoadReceiptCache", (event: IpcMessageEvent, args: ReceiptList | Error) => {
      if (args instanceof Error) {
        console.log(args); //FIXME
      } else {
        this.receiptListRepository.set(args);
      }
    });
  }
}