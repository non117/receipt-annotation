import ReceiptList from "../domain/ReceiptList";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";
import settingRepository, { SettingRepository } from "../infrastructure/SettingRepository";
import { JSONWriter } from "../infrastructure/JsonFs";

export class ExportReceiptFactory {
  static create() {
    return new ExportReceipt(receiptListRepository, settingRepository);
  }
}

export class ExportReceipt {
  private receiptListRepository: ReceiptListRepository;
  private settingRepository: SettingRepository;

  constructor(receiptListRepository: ReceiptListRepository, settingRepository: SettingRepository) {
    this.receiptListRepository = receiptListRepository;
    this.settingRepository = settingRepository;
  }

  execute() {
    const receiptJsonPath = this.settingRepository.get().receiptJsonPath;
    const receiptList = this.receiptListRepository.get();
    const content = JSON.stringify(receiptList);
    JSONWriter.execute(receiptJsonPath, content);
  }
}