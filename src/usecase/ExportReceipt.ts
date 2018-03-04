import ReceiptList from "../domain/ReceiptList";
import receiptRepository, { ReceiptRepository } from "../infrastructure/ReceiptRepository";
import settingRepository, { SettingRepository } from "../infrastructure/SettingRepository";
import { JSONWriter } from "../infrastructure/JsonFs";

export class ExportReceiptFactory {
  static create() {
    return new ExportReceipt(receiptRepository, settingRepository);
  }
}

export class ExportReceipt {
  private receiptRepository: ReceiptRepository;
  private settingRepository: SettingRepository;

  constructor(receiptRepository: ReceiptRepository, settingRepository: SettingRepository) {
    this.receiptRepository = receiptRepository;
    this.settingRepository = settingRepository;
  }

  execute() {
    const receiptJsonPath = this.settingRepository.get().receiptJsonPath;
    const receiptList = this.receiptRepository.get();
    const content = JSON.stringify(receiptList);
    JSONWriter.execute(receiptJsonPath, content);
  }
}