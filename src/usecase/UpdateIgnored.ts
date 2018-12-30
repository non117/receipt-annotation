import * as moment from "moment";
import ReceiptList from "../domain/ReceiptList";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";

export class UpdateIgnoredFactory {
  static create() {
    return new UpdateIgnored(receiptListRepository);
  }
}

export class UpdateIgnored {
  private receiptListRepository: ReceiptListRepository;

  constructor(receiptListRepository: ReceiptListRepository) {
    this.receiptListRepository = receiptListRepository;
  }

  execute(ignored: boolean) {
    const receiptList = this.receiptListRepository.get();
    receiptList.updateReceipt({ ignored });
    this.receiptListRepository.set(receiptList);
  }
}