import Account from "../domain/Account";
import ReceiptList from "../domain/ReceiptList";
import receiptRepository, { ReceiptRepository } from "../infrastructure/ReceiptRepository";
import accountListRepository from "../infrastructure/AccountListRepository";

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

  execute(creditAccountFullName: string) {
    const account = accountListRepository.get().findByFullName(creditAccountFullName);
    const receiptList = receiptRepository.get();
    receiptList.updateReceipt({ creditAccount: account });
    receiptRepository.set(receiptList);
  }
}