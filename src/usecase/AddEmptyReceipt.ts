import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";
import walletListRepository, { WalletListRepository } from "../infrastructure/WalletListRepository";
import { emptyReceipt } from "../domain/services/ConstructReceipt"

export class AddEmptyReceiptFactory {
  static create() {
    return new AddEmptyReceipt(receiptListRepository, walletListRepository);
  }
}

export class AddEmptyReceipt {
  private receiptListRepository: ReceiptListRepository;
  private walletListRepository: WalletListRepository;

  constructor(receiptListRepository: ReceiptListRepository, walletListRepository: WalletListRepository) {
    this.receiptListRepository = receiptListRepository;
    this.walletListRepository = walletListRepository;
  }

  execute() {
    const receiptList = this.receiptListRepository.get();
    const receipt = emptyReceipt(this.walletListRepository.get().getCurrent())
    receiptList.push(receipt)
    receiptList.moveNext();
    this.receiptListRepository.set(receiptList);
  }
}