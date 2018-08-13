import Receipt, { ReceiptObject } from "../domain/Receipt";
import ReceiptList from "../domain/ReceiptList";
import walletListRepository, { WalletListRepository } from "../infrastructure/WalletListRepository";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";
import settingRepository, { SettingRepository } from "../infrastructure/SettingRepository";
import { Reader } from "../infrastructure/FileIO";

export class LoadReceiptListFactory {
  static create() {
    return new LoadReceiptList(walletListRepository, receiptListRepository, settingRepository);
  }
}

export class LoadReceiptList {
  private walletListRepository: WalletListRepository;
  private receiptListRepository: ReceiptListRepository;
  private settingRepository: SettingRepository;

  constructor(walletListRepository: WalletListRepository, receiptListRepository: ReceiptListRepository, settingRepository: SettingRepository) {
    this.walletListRepository = walletListRepository;
    this.receiptListRepository = receiptListRepository;
    this.settingRepository = settingRepository;
  }

  execute() {
    const setting = this.settingRepository.get();
    const wallet = this.walletListRepository.get().getCurrent();
    const accountList = wallet.accountList;
    const defaultDebitAccount = wallet.getDefaultDebitAccount();
    const defaultCreditAccount = wallet.getDefaultCreditAccount();
    const rawJson = Reader.execute(setting.annotatedJsonPath);
    const receipts = <Receipt[]>JSON.parse(rawJson).map((receipt: ReceiptObject) => {
      const accounts = {
        debitAccount: defaultDebitAccount,
        creditAccount: accountList.findByFullName(wallet.keywords[receipt.memo]) || defaultCreditAccount,
      };
      return new Receipt(Object.assign(receipt, accounts));
    });
    this.receiptListRepository.set(new ReceiptList(receipts));
  }
}