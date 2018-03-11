import Account from "../domain/Account";
import ReceiptList from "../domain/ReceiptList";
import receiptRepository, { ReceiptRepository } from "../infrastructure/ReceiptRepository";
import accountListRepository from "../infrastructure/AccountListRepository";

export class SelectDebitAccountFactory {
  static create() {
    return new SelectDebitAccount(receiptRepository);
  }
}

export class SelectDebitAccount {
  private receiptRepository: ReceiptRepository;

  constructor(repository: ReceiptRepository) {
    this.receiptRepository = repository;
  }

  execute(debitAccountFullName: string) {
    const account = accountListRepository.get().findByFullName(debitAccountFullName);
    const receiptList = receiptRepository.get();
    receiptList.updateReceipt({ debitAccount: account });
    receiptRepository.set(receiptList);
  }
}