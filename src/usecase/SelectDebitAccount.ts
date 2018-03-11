import Account from "../domain/Account";
import ReceiptList from "../domain/ReceiptList";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";
import accountListRepository, { AccountListRepository } from "../infrastructure/AccountListRepository";

export class SelectDebitAccountFactory {
  static create() {
    return new SelectDebitAccount(receiptListRepository, accountListRepository);
  }
}

export class SelectDebitAccount {
  private receiptListRepository: ReceiptListRepository;
  private accountListRepository: AccountListRepository;

  constructor(receiptListRepository: ReceiptListRepository, accountListRepository: AccountListRepository) {
    this.receiptListRepository = receiptListRepository;
    this.accountListRepository = accountListRepository;
  }

  execute(debitAccountFullName: string) {
    const account = this.accountListRepository.get().findByFullName(debitAccountFullName);
    const receiptList = this.receiptListRepository.get();
    receiptList.updateReceipt({ debitAccount: account });
    this.receiptListRepository.set(receiptList);
  }
}