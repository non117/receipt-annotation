import ReceiptList from "../domain/ReceiptList";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";
import settingRepository, { SettingRepository } from "../infrastructure/SettingRepository";
import { Writer } from "../infrastructure/FileIO";
import ReceiptQifConverter from "../infrastructure/ReceiptQifConverter";

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
    const setting = this.settingRepository.get();
    const receiptList = this.receiptListRepository.get();
    const content = ReceiptQifConverter.execute(receiptList.getUsable());
    //const content = JSON.stringify(receiptList); // FIXME
    Writer.execute(`${setting.outputDirectory}/receipts${setting.outputExtension()}`, content);
  }
}