import ReceiptList from "../domain/ReceiptList";
import receiptRepository, { ReceiptRepository } from "../infrastructure/ReceiptRepository";

export class MovePrevFactory {
  static create() {
    return new MovePrev(receiptRepository);
  }
}

export class MovePrev {
  private receiptRepository: ReceiptRepository;

  constructor(repository: ReceiptRepository) {
    this.receiptRepository = repository;
  }

  execute() {
    const receiptList = receiptRepository.get();
    receiptList.movePrev();
    receiptRepository.set(receiptList);
  }
}