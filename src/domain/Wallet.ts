import { AccountObject } from "./Account";
import AccountList from "./AccountList";

export interface WalletObject {
  name: string;
  defaultCreditAccount: string;
  defaultDebitAccount: string;
  keywords: { [key: string]: string };
  accounts: Array<AccountObject>;
}

export default class Wallet {
  name: string;
  defaultCreditAccount: string;
  defaultDebitAccount: string;
  keywords: { [key: string]: string };
  accountList: AccountList;

  constructor(wallet: WalletObject) {
    Object.assign(this, wallet);
  }
}