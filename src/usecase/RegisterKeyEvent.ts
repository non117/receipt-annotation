import Setting from "../domain/Setting";
import settingRepository, { SettingRepository } from "../infrastructure/SettingRepository";
import { MoveNextFactory } from "./MoveNext";
import { MovePrevFactory } from "./MovePrev";

export class RegisterKeyEventFactory {
  static create() {
    return new RegisterKeyEvent(settingRepository);
  }
}

export class RegisterKeyEvent {
  private settingRepository: SettingRepository;

  constructor(settingRepository: SettingRepository) {
    this.settingRepository = settingRepository;
  }

  execute() {
    const setting = this.settingRepository.get();
    window.addEventListener("keyup", e => {
      if((e.target as HTMLElement).tagName !== "INPUT") {
        if(e.key === setting.moveNextKey) {
          MoveNextFactory.create().execute(); 
        } else if (e.key === setting.movePrevKey) {
          MovePrevFactory.create().execute();
        }
      }
    });
  }
}