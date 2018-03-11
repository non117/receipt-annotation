export interface AccountObject {
  name: string;
  fullName: string;
  type: string;
}

export enum AccountType {
  ASSET = "ASSET",
  BANK = "BANK",
  CASH = "CASH",
  CREDIT = "CREDIT",
  EXPENSE = "EXPENSE",
  LIABILITY = "LIABILITY",
  INCOME = "INCOME"
}

export default class Account {
  name: string;
  fullName: string;
  type: AccountType;

  constructor(account: AccountObject) {
    this.name = account.name;
    this.fullName = account.fullName;
    this.type = <AccountType>account.type;
  }

  isDebit(): boolean {
    return this.type === AccountType.EXPENSE;
  }

  isCredit(): boolean {
    return this.type === AccountType.CASH ||
      this.type === AccountType.CREDIT ||
      this.type === AccountType.BANK;
  }
}