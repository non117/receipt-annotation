import Setting from "../domain/Setting";
import settingRepository, { SettingRepository } from "../infrastructure/SettingRepository";
import { Reader } from "../infrastructure/FileIO";

export class LoadSettingFactory {
  static create() {
    return new LoadSetting(settingRepository);
  }
}

export class LoadSetting {
  private settingRepository: SettingRepository;

  constructor(settingRepository: SettingRepository) {
    this.settingRepository = settingRepository;
  }

  execute(jsonPath: string) {
    const rawJson = Reader.execute(jsonPath);
    const setting = new Setting(JSON.parse(rawJson));
    this.settingRepository.set(setting);
  }
}