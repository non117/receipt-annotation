interface SettingObject {
  receiptJsonPath: string;
  annotatedJsonPath: string;
}

export default class Setting {
  receiptJsonPath: string;
  annotatedJsonPath: string;

  constructor(setting: SettingObject) {
    this.receiptJsonPath = setting.receiptJsonPath;
    this.annotatedJsonPath = setting.annotatedJsonPath;
  }
}