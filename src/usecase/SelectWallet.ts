import walletListRepository, { WalletListRepository } from "../infrastructure/WalletListRepository";

export class SelectWalletFactory {
  static create() {
    return new SelectWallet(walletListRepository);
  }
}

export class SelectWallet {
  private walletListRepository: WalletListRepository;

  constructor(walletListRepository: WalletListRepository) {
    this.walletListRepository = walletListRepository;
  }

  execute(walletName: string) {
    const walletList = this.walletListRepository.get();
    walletList.select(walletName);
    this.walletListRepository.set(walletList);
  }
}