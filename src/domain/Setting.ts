interface SettingObject {
  receiptJsonPath: string;
  annotatedJsonPath: string;
  defaultCreditAccount: string;
  defaultDebitAccount: string;
  moveNextKey: string;
  movePrevKey: string;
}

export default class Setting {
  receiptJsonPath: string;
  annotatedJsonPath: string;
  defaultCreditAccount: string;
  defaultDebitAccount: string;
  moveNextKey: string;
  movePrevKey: string;

  constructor(setting: SettingObject) {
    Object.assign(this, setting);
  }
}