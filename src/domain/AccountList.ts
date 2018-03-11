import Account from "./Account";

export default class AccountList {
  private _accounts: Array<Account>;

  constructor(accounts: Array<Account>) {
    this._accounts = accounts;
  }

  filterDebit(): Array<Account> {
    return this._accounts.filter(account => account.isDebit());
  }

  filterCredit(): Array<Account> {
    return this._accounts.filter(account => account.isCredit());
  }
}