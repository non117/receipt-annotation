import * as moment from "moment";
import ReceiptList from "../domain/ReceiptList";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";

export class UpdateDateFactory {
  static create() {
    return new UpdateDate(receiptListRepository);
  }
}

export class UpdateDate {
  private receiptListRepository: ReceiptListRepository;

  constructor(receiptListRepository: ReceiptListRepository) {
    this.receiptListRepository = receiptListRepository;
  }

  execute(date: moment.Moment) {
    const receiptList = this.receiptListRepository.get();
    receiptList.updateReceipt({ date: date });
    this.receiptListRepository.set(receiptList);
  }
}