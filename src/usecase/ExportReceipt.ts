import ReceiptList from "../domain/ReceiptList";
import receiptRepository, { ReceiptRepository } from "../infrastructure/ReceiptRepository";
import { JSONWriter } from "../infrastructure/JsonFs";

export class ExportReceiptFactory {
  static create() {
    return new ExportReceipt(receiptRepository);
  }
}

export class ExportReceipt {
  private receiptRepository: ReceiptRepository;

  constructor(repository: ReceiptRepository) {
    this.receiptRepository = repository;
  }

  execute(jsonPath: string) {
    const receiptList = this.receiptRepository.get();
    const content = JSON.stringify(receiptList);
    JSONWriter.execute(jsonPath, content);
  }
}