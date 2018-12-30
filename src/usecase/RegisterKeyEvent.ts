import Setting from "../domain/Setting";
import settingRepository, { SettingRepository } from "../infrastructure/SettingRepository";
import { MoveNextFactory } from "./MoveNext";
import { MovePrevFactory } from "./MovePrev";

export class RegisterKeyEventFactory {
  static create() {
    return new RegisterKeyEvent(settingRepository, window);
  }
}

export class RegisterKeyEvent {
  private settingRepository: SettingRepository;
  private window: Window;

  constructor(settingRepository: SettingRepository, window: Window) {
    this.settingRepository = settingRepository;
    this.window = window;
  }

  execute() {
    const setting = this.settingRepository.get();
    this.window.addEventListener("keyup", e => {
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