import WalletSet from "./WalletSet";

interface SettingObject {
  annotatedJsonPath: string;
  outputDirectory: string;
  outputFormat: string;
  moveNextKey: string;
  movePrevKey: string;
  wallets: WalletSet;
}

export default class Setting {
  annotatedJsonPath: string;
  outputDirectory: string;
  outputFormat: string;
  moveNextKey: string;
  movePrevKey: string;
  wallets: WalletSet;

  constructor(setting: SettingObject) {
    Object.assign(this, setting);
  }

  outputExtension(): string {
    return `.${this.outputFormat}`; // FIXME
  }
}