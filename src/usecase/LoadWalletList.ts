import Account, { AccountObject } from "../domain/Account";
import AccountList from "../domain/AccountList";
import Wallet, { WalletObject } from "../domain/Wallet";
import WalletList from "../domain/WalletList";
import walletListRepository, { WalletListRepository } from "../infrastructure/WalletListRepository";
import { readFile } from "../infrastructure/FileIO";

export class LoadWalletListFactory {
  static create() {
    return new LoadWalletList(walletListRepository);
  }
}

export class LoadWalletList {
  private walletListRepository: WalletListRepository;

  constructor(walletListRepository: WalletListRepository) {
    this.walletListRepository = walletListRepository;
  }

  execute(jsonPath: string) {
    const rawJson = readFile(jsonPath).toString();
    const walletObject = JSON.parse(rawJson);
    const wallets = walletObject.map(
      (wallet: WalletObject) => {
        const accounts = wallet.accounts.map(
          (account: AccountObject) => new Account(account)
        );
        const accountList = new AccountList(accounts);
        return new Wallet(Object.assign(wallet, { accountList }));
      }
    );
    this.walletListRepository.set(new WalletList(wallets));
  }
}