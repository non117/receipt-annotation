import Receipt from "../domain/Receipt";
import ReceiptList from "../domain/ReceiptList";
import receiptRepository, { ReceiptRepository } from "../infrastructure/ReceiptRepository";
import settingRepository, { SettingRepository } from "../infrastructure/SettingRepository";
import { JSONReader } from "../infrastructure/JsonFs";

export class LoadReceiptFactory {
  static create() {
    return new LoadReceipt(receiptRepository, settingRepository);
  }
}

export class LoadReceipt {
  private receiptRepository: ReceiptRepository;
  private settingRepository: SettingRepository;

  constructor(receiptRepository: ReceiptRepository, settingRepository: SettingRepository) {
    this.receiptRepository = receiptRepository;
    this.settingRepository = settingRepository;
  }

  execute() {
    const annotatedJsonPath = this.settingRepository.get().annotatedJsonPath;
    const rawJson = JSONReader.execute(annotatedJsonPath);
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