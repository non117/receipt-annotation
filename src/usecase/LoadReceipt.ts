import * as fs from "fs";
import ReceiptList from "../domain/ReceiptList";
import receiptRepository, { ReceiptRepository } from "../infrastructure/ReceiptRepository";
import ReceiptDeserializer from "../infrastructure/ReceiptDeserializer";

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
    const rawJson = fs.readFileSync(jsonPath).toString();
    const receipts = ReceiptDeserializer.deserializeFromString(rawJson);
    this.receiptRepository.set(new ReceiptList(receipts));
  }
}