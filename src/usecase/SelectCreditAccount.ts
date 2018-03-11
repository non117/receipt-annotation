import Account from "../domain/Account";
import ReceiptList from "../domain/ReceiptList";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";
import accountListRepository, { AccountListRepository } from "../infrastructure/AccountListRepository";

export class SelectCreditAccountFactory {
  static create() {
    return new SelectCreditAccount(receiptListRepository, accountListRepository);
  }
}

export class SelectCreditAccount {
  private receiptListRepository: ReceiptListRepository;
  private accountListRepository: AccountListRepository;

  constructor(receiptListRepository: ReceiptListRepository, accountListRepository: AccountListRepository) {
    this.receiptListRepository = receiptListRepository;
    this.accountListRepository = accountListRepository;
  }

  execute(creditAccountFullName: string) {
    const account = this.accountListRepository.get().findByFullName(creditAccountFullName);
    const receiptList = this.receiptListRepository.get();
    receiptList.updateReceipt({ creditAccount: account });
    this.receiptListRepository.set(receiptList);
  }
}