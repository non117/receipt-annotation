import Account from "../domain/Account";
import ReceiptList from "../domain/ReceiptList";
import receiptRepository, { ReceiptRepository } from "../infrastructure/ReceiptRepository";

export class SelectCreditAccountFactory {
  static create() {
    return new SelectCreditAccount(receiptRepository);
  }
}

export class SelectCreditAccount {
  private receiptRepository: ReceiptRepository;

  constructor(repository: ReceiptRepository) {
    this.receiptRepository = repository;
  }

  execute(creditAccount: Account) {
    const receiptList = receiptRepository.get();
    receiptList.updateReceipt({ creditAccount: creditAccount });
    receiptRepository.set(receiptList);
  }
}