import Receipt from "../domain/Receipt";
import ReceiptList from "../domain/ReceiptList";
import receiptRepository, { ReceiptRepository } from "../infrastructure/ReceiptRepository";
import { JSONReader } from "../infrastructure/JsonFs";

export class LoadReceiptFactory {
  static create() {
    return new LoadReceipt(receiptRepository);
  }
}

export class LoadReceipt {
  private receiptRepository: ReceiptRepository;

  constructor(repository: ReceiptRepository) {
    this.receiptRepository = repository;
  }

  execute(jsonPath: string) {
    const rawJson = JSONReader.execute(jsonPath);
    const receipts = this.deserializeFromString(rawJson);
    this.receiptRepository.set(new ReceiptList(receipts));
  }

  private deserializeFromString(rawJson: string): Array<Receipt> {
    return JSON.parse(rawJson, (key: string, value: any) => {
      if (value instanceof Array) {
        return value.map(receipt => new Receipt(receipt));
      } else {
        return value;
      }
    });
  }
}