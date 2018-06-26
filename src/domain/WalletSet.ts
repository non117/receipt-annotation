import Wallet from "./Wallet";

export default class WalletSet {
  private _walletSet: Map<string, Wallet>
  currentWalletName: string;

  constructor(walletSet: Map<string, Wallet>) {
    this._walletSet = walletSet;
    this.currentWalletName = walletSet.keys()[0];
  }

  getCurrent(): Wallet {
    return this._walletSet.get(this.currentWalletName);
  }
}