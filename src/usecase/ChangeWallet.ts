import constructReceipt from "../domain/services/ConstructReceipt";
import receiptListRepository, { ReceiptListRepository } from "../infrastructure/ReceiptListRepository";
import walletListRepository, { WalletListRepository } from "../infrastructure/WalletListRepository";
import ReceiptList from "../domain/ReceiptList";

export class ChangeWalletFactory {
  static create() {
    return new ChangeWallet(receiptListRepository, walletListRepository);
  }
}

export class ChangeWallet {
  private receiptListRepository: ReceiptListRepository;
  private walletListRepository: WalletListRepository;

  constructor(receiptListRepository: ReceiptListRepository, walletListRepository: WalletListRepository) {
    this.receiptListRepository = receiptListRepository;
    this.walletListRepository = walletListRepository;
  }

  execute(walletName: string) {
    const receiptList = this.receiptListRepository.get();
    const walletList = this.walletListRepository.get();
    walletList.select(walletName);
    const wallet = walletList.getCurrent();
    const newReceipts = receiptList.getAll().map(receipt =>
      constructReceipt(receipt.imagePath, receipt.lines, wallet)
    );
    this.receiptListRepository.set(new ReceiptList(newReceipts));
    this.walletListRepository.set(walletList);
  }
}
