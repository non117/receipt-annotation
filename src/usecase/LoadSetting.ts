import Setting from "../domain/Setting";
import settingRepository, { SettingRepository } from "../infrastructure/SettingRepository";
import { readFile } from "../infrastructure/FileIO";

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
    const rawJson = readFile(jsonPath).toString();
    const setting = new Setting(JSON.parse(rawJson));
    this.settingRepository.set(setting);
  }
}