import ReceiptList from "../domain/ReceiptList";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";

export class MoveNextFactory {
  static create() {
    return new MoveNext(receiptListRepository);
  }
}

export class MoveNext {
  private receiptListRepository: ReceiptListRepository;

  constructor(receiptListRepository: ReceiptListRepository) {
    this.receiptListRepository = receiptListRepository;
  }

  execute() {
    const receiptList = this.receiptListRepository.get();
    receiptList.moveNext();
    this.receiptListRepository.set(receiptList);
  }
}