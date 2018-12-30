const REPOSITORY_CHANGE = "REPOSITORY_CHANGE";
import { EventEmitter } from "events";
import Setting from "../domain/Setting";

export class SettingRepository extends EventEmitter {
  private setting: Setting;
  constructor() {
    super();
    this.setting = null;
  }

  get(): Setting {
    return this.setting;
  }

  set(setting: Setting) {
    this.setting = setting;
    this.emit(REPOSITORY_CHANGE);
  }

  onChange(handler: () => void) {
    this.on(REPOSITORY_CHANGE, handler);
  }
}

// singleton
export default new SettingRepository();