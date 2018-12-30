import Account from "../domain/Account";
import ReceiptList from "../domain/ReceiptList";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";
import walletListRepository, { WalletListRepository } from "../infrastructure/WalletListRepository";

export class SelectCreditAccountFactory {
  static create() {
    return new SelectCreditAccount(receiptListRepository, walletListRepository);
  }
}

export class SelectCreditAccount {
  private receiptListRepository: ReceiptListRepository;
  private walletListRepository: WalletListRepository;

  constructor(receiptListRepository: ReceiptListRepository, walletListRepository: WalletListRepository) {
    this.receiptListRepository = receiptListRepository;
    this.walletListRepository = walletListRepository;
  }

  execute(creditAccountFullName: string) {
    const account = this.walletListRepository.get().getCurrent().accountList.findByFullName(creditAccountFullName);
    const receiptList = this.receiptListRepository.get();
    receiptList.updateReceipt({ creditAccount: account });
    this.receiptListRepository.set(receiptList);
  }
}