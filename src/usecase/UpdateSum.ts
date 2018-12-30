import ReceiptList from "../domain/ReceiptList";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";

export class UpdateSumFactory {
  static create() {
    return new UpdateSum(receiptListRepository);
  }
}

export class UpdateSum {
  private receiptListRepository: ReceiptListRepository;

  constructor(receiptListRepository: ReceiptListRepository) {
    this.receiptListRepository = receiptListRepository;
  }

  execute(sum: string) {
    const parsedSum = Number(sum);
    const receiptList = this.receiptListRepository.get();
    receiptList.updateReceipt({ sum: parsedSum || 0 });
    this.receiptListRepository.set(receiptList);
  }
}