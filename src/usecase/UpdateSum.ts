import ReceiptList from "../domain/ReceiptList";
import receiptRepository, { ReceiptRepository } from "../infrastructure/ReceiptRepository";

export class UpdateSumFactory {
  static create() {
    return new UpdateSum(receiptRepository);
  }
}

export class UpdateSum {
  private receiptRepository: ReceiptRepository;

  constructor(repository: ReceiptRepository) {
    this.receiptRepository = repository;
  }

  execute(sum: string) {
    const parsedSum = Number(sum);
    if (parsedSum !== NaN) {
      const receiptList = receiptRepository.get();
      receiptList.updateReceipt({ sum: parsedSum });
      receiptRepository.set(receiptList);
    }
  }
}