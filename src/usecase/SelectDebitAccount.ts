import Account from "../domain/Account";
import ReceiptList from "../domain/ReceiptList";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";
import accountListRepository, { WalletListRepository } from "../infrastructure/WalletListRepository";

export class SelectDebitAccountFactory {
  static create() {
    return new SelectDebitAccount(receiptListRepository, accountListRepository);
  }
}

export class SelectDebitAccount {
  private receiptListRepository: ReceiptListRepository;
  private walletListRepository: WalletListRepository;

  constructor(receiptListRepository: ReceiptListRepository, walletListRepository: WalletListRepository) {
    this.receiptListRepository = receiptListRepository;
    this.walletListRepository = walletListRepository;
  }

  execute(debitAccountFullName: string) {
    const account = this.walletListRepository.get().getCurrent().accountList.findByFullName(debitAccountFullName);
    const receiptList = this.receiptListRepository.get();
    receiptList.updateReceipt({ debitAccount: account });
    this.receiptListRepository.set(receiptList);
  }
}