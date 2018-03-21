import Account, { AccountObject } from "../domain/Account";
import AccountList from "../domain/AccountList";
import accountListRepository, { AccountListRepository } from "../infrastructure/AccountListRepository";
import { Reader } from "../infrastructure/FileIO";

export class LoadAccountListFactory {
  static create() {
    return new LoadAccountList(accountListRepository);
  }
}

export class LoadAccountList {
  private accountListRepository: AccountListRepository;

  constructor(accountListRepository: AccountListRepository) {
    this.accountListRepository = accountListRepository;
  }

  execute(jsonPath: string) {
    const rawJson = Reader.execute(jsonPath);
    const accounts = JSON.parse(rawJson).map(
      (account: AccountObject) => new Account(account)
    );
    this.accountListRepository.set(new AccountList(accounts));
  }
}