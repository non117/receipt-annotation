import Receipt, { ReceiptObject } from "../domain/Receipt";
import ReceiptList from "../domain/ReceiptList";
import accountListRepository, { AccountListRepository } from "../infrastructure/AccountListRepository";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";
import settingRepository, { SettingRepository } from "../infrastructure/SettingRepository";
import { Reader } from "../infrastructure/FileIO";

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
    const defaultDebitAccount = accountList.findByFullName(setting.defaultDebitAccount);
    const defaultCreditAccount = accountList.findByFullName(setting.defaultCreditAccount);
    const rawJson = Reader.execute(setting.annotatedJsonPath);
    const receipts = <Receipt[]>JSON.parse(rawJson).map((receipt: ReceiptObject) => {
      const accounts = {
        debitAccount: defaultDebitAccount,
        creditAccount: accountList.findByFullName(setting.keywords[receipt.memo]) || defaultCreditAccount,
      };
      return new Receipt(Object.assign(receipt, accounts));
    });
    this.receiptListRepository.set(new ReceiptList(receipts));
  }
}