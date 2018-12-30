interface SettingObject {
  apiKey: string;
  receiptImageDirectory: string;
  outputDirectory: string;
  outputFormat: string;
  moveNextKey: string;
  movePrevKey: string;
}

export default class Setting {
  apiKey: string;
  receiptImageDirectory: string;
  outputDirectory: string;
  outputFormat: string;
  moveNextKey: string;
  movePrevKey: string;

  constructor(setting: SettingObject) {
    Object.assign(this, setting);
  }

  outputExtension(): string {
    return `.${this.outputFormat}`; // FIXME
  }
}