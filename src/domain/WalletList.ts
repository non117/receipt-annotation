import Wallet from "./Wallet";

export default class WalletList {
  private _wallets: Map<string, Wallet>;
  currentWalletName: string;

  constructor(wallets: Array<Wallet>) {
    this._wallets = wallets.reduce((map, wallet) => map.set(wallet.name, wallet), new Map());
    this.currentWalletName = wallets[0].name
  }

  getCurrent(): Wallet {
    return this._wallets.get(this.currentWalletName);
  }

  select(walletName: string) {
    if(this._wallets.get(walletName) !== undefined) {
      this.currentWalletName = walletName;
    }
  }
}