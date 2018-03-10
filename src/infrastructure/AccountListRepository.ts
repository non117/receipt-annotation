const REPOSITORY_CHANGE = "REPOSITORY_CHANGE";
import { EventEmitter } from "events";
import AccountList from "../domain/AccountList";

export class AccountListRepository extends EventEmitter {
  private accountList: AccountList;
  constructor() {
    super();
    this.accountList = null;
  }

  get(): AccountList {
    return this.accountList;
  }

  set(accountList: AccountList) {
    this.accountList = accountList;
    this.emit(REPOSITORY_CHANGE);
  }

  onChange(handler: () => void) {
    this.on(REPOSITORY_CHANGE, handler);
  }
}

// singleton
export default new AccountListRepository();