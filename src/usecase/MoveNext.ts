import ReceiptList from "../domain/ReceiptList";
import receiptRepository, { ReceiptRepository } from "../infrastructure/ReceiptRepository";

export class MoveNextFactory {
  static create() {
    return new MoveNext(receiptRepository);
  }
}

export class MoveNext {
  private receiptRepository: ReceiptRepository;

  constructor(repository: ReceiptRepository) {
    this.receiptRepository = repository;
  }

  execute() {
    const receiptList = receiptRepository.get();
    receiptList.moveNext();
    receiptRepository.set(receiptList);
  }
}