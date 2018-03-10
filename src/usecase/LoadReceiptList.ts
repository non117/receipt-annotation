import Receipt, { ReceiptObject } from "../domain/Receipt";
import ReceiptList from "../domain/ReceiptList";
import receiptRepository, { ReceiptRepository } from "../infrastructure/ReceiptRepository";
import settingRepository, { SettingRepository } from "../infrastructure/SettingRepository";
import { JSONReader } from "../infrastructure/JsonFs";

export class LoadReceiptListFactory {
  static create() {
    return new LoadReceiptList(receiptRepository, settingRepository);
  }
}

export class LoadReceiptList {
  private receiptRepository: ReceiptRepository;
  private settingRepository: SettingRepository;

  constructor(receiptRepository: ReceiptRepository, settingRepository: SettingRepository) {
    this.receiptRepository = receiptRepository;
    this.settingRepository = settingRepository;
  }

  execute() {
    const annotatedJsonPath = this.settingRepository.get().annotatedJsonPath;
    const rawJson = JSONReader.execute(annotatedJsonPath);
    const receipts = JSON.parse(rawJson).map(
      (receipt: ReceiptObject) => new Receipt(receipt)
    )
    this.receiptRepository.set(new ReceiptList(receipts));
  }
}