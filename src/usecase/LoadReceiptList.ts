import Receipt, { ReceiptObject } from "../domain/Receipt";
import ReceiptList from "../domain/ReceiptList";
import accountListRepository, { AccountListRepository } from "../infrastructure/AccountListRepository";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";
import settingRepository, { SettingRepository } from "../infrastructure/SettingRepository";
import { JSONReader } from "../infrastructure/JsonFs";

export class LoadReceiptListFactory {
  static create() {
    return new LoadReceiptList(accountListRepository, receiptListRepository, settingRepository);
  }
}

export class LoadReceiptList {
  private accountListRepository: AccountListRepository;
  private receiptListRepository: ReceiptListRepository;
  private settingRepository: SettingRepository;

  constructor(accountListRepository: AccountListRepository, receiptListRepository: ReceiptListRepository, settingRepository: SettingRepository) {
    this.accountListRepository = accountListRepository;
    this.receiptListRepository = receiptListRepository;
    this.settingRepository = settingRepository;
  }

  execute() {
    const setting = this.settingRepository.get();
    const accountList = this.accountListRepository.get();
    const defaultAccounts = {
      debitAccount: accountList.findByFullName(setting.defaultDebitAccount),
      creditAccount: accountList.findByFullName(setting.defaultCreditAccount),
    };
    const rawJson = JSONReader.execute(setting.annotatedJsonPath);
    const receipts = <Receipt[]>JSON.parse(rawJson).map(
      (receipt: ReceiptObject) => new Receipt(Object.assign(receipt, defaultAccounts))
    )
    this.receiptListRepository.set(new ReceiptList(receipts));
  }
}