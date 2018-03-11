interface SettingObject {
  receiptJsonPath: string;
  annotatedJsonPath: string;
  defaultCreditAccount: string;
  defaultDebitAccount: string;
}

export default class Setting {
  receiptJsonPath: string;
  annotatedJsonPath: string;
  defaultCreditAccount: string;
  defaultDebitAccount: string;

  constructor(setting: SettingObject) {
    this.receiptJsonPath = setting.receiptJsonPath;
    this.annotatedJsonPath = setting.annotatedJsonPath;
    this.defaultCreditAccount = setting.defaultCreditAccount;
    this.defaultDebitAccount = setting.defaultDebitAccount;
  }
}