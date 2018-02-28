import * as moment from "moment";
import ReceiptList from "../domain/ReceiptList";
import receiptRepository, { ReceiptRepository } from "../infrastructure/ReceiptRepository";

export class UpdateDateFactory {
  static create() {
    return new UpdateDate(receiptRepository);
  }
}

export class UpdateDate {
  private receiptRepository: ReceiptRepository;

  constructor(repository: ReceiptRepository) {
    this.receiptRepository = repository;
  }

  execute(date: moment.Moment) {
    const receiptList = receiptRepository.get();
    receiptList.updateReceipt({ date: date });
    receiptRepository.set(receiptList);
  }
}