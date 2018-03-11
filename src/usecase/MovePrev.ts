import ReceiptList from "../domain/ReceiptList";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";

export class MovePrevFactory {
  static create() {
    return new MovePrev(receiptListRepository);
  }
}

export class MovePrev {
  private receiptListRepository: ReceiptListRepository;

  constructor(receiptListRepository: ReceiptListRepository) {
    this.receiptListRepository = receiptListRepository;
  }

  execute() {
    const receiptList = this.receiptListRepository.get();
    receiptList.movePrev();
    this.receiptListRepository.set(receiptList);
  }
}