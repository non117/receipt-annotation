import Receipt, { ReceiptObject } from "../domain/Receipt";
import ReceiptList from "../domain/ReceiptList";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";
import settingRepository, { SettingRepository } from "../infrastructure/SettingRepository";
import { JSONReader } from "../infrastructure/JsonFs";

export class LoadReceiptListFactory {
  static create() {
    return new LoadReceiptList(receiptListRepository, settingRepository);
  }
}

export class LoadReceiptList {
  private receiptListRepository: ReceiptListRepository;
  private settingRepository: SettingRepository;

  constructor(receiptListRepository: ReceiptListRepository, settingRepository: SettingRepository) {
    this.receiptListRepository = receiptListRepository;
    this.settingRepository = settingRepository;
  }

  execute() {
    const annotatedJsonPath = this.settingRepository.get().annotatedJsonPath;
    const rawJson = JSONReader.execute(annotatedJsonPath);
    const receipts = JSON.parse(rawJson).map(
      (receipt: ReceiptObject) => new Receipt(receipt)
    )
    this.receiptListRepository.set(new ReceiptList(receipts));
  }
}