import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";
import { ipcRenderer, IpcRendererEvent } from "electron";

export class SaveReceiptCacheFactory {
  static create() {
    return new SaveReceiptCache(receiptListRepository);
  }
}

export class SaveReceiptCache {
  private receiptListRepository: ReceiptListRepository;

  constructor(receiptListRepository: ReceiptListRepository) {
    this.receiptListRepository = receiptListRepository;
  }

  execute() {
    const receipts = this.receiptListRepository.get().getAll();
    if (receipts.length > 0) {
      ipcRenderer.send("requestSaveReceiptCache", receipts);
      ipcRenderer.on("responseSaveReceiptCache", (event: IpcRendererEvent, args: object) => {
        console.log(args); //FIXME: promisify?
      });
    }
  }
}