import Account, { AccountObject } from "../domain/Account";
import AccountList from "../domain/AccountList";
import accountListRepository, { AccountListRepository } from "../infrastructure/AccountListRepository";
import { JSONReader } from "../infrastructure/JsonFs";

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
    const rawJson = JSONReader.execute(jsonPath);
    const accounts = JSON.parse(rawJson).map(
      (account: AccountObject) => new Account(account)
    );
    this.accountListRepository.set(new AccountList(accounts));
  }
}