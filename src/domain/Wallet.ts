import AccountList from "./AccountList";

interface WalletObject {
  accountList: AccountList;
  defaultCreditAccount: string;
  defaultDebitAccount: string;
  keywords: { [key: string]: string };
}

export default class Wallet {
  accountList: AccountList;
  defaultCreditAccount: string;
  defaultDebitAccount: string;
  keywords: { [key: string]: string };

  constructor(wallet: WalletObject) {
    Object.assign(this, wallet);
  }
}