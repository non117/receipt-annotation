import Account from "./Account";

export default class AccountList {
  private _accounts: Array<Account>;

  constructor(accounts: Array<Account>) {
    this._accounts = accounts;
  }
}