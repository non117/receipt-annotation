import Account from "../domain/Account";
import ReceiptList from "../domain/ReceiptList";
import receiptRepository, { ReceiptRepository } from "../infrastructure/ReceiptRepository";

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

  execute(debitAccount: Account) {
    const receiptList = receiptRepository.get();
    receiptList.updateReceipt({ debitAccount: debitAccount });
    receiptRepository.set(receiptList);
  }
}