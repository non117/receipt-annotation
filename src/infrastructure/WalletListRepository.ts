const REPOSITORY_CHANGE = "REPOSITORY_CHANGE";
import { EventEmitter } from "events";
import WalletList from "../domain/WalletList";

export class WalletListRepository extends EventEmitter {
  private walletList: WalletList;
  constructor() {
    super();
    this.walletList = null;
  }

  get(): WalletList {
    return this.walletList;
  }

  set(walletList: WalletList) {
    this.walletList = walletList;
    this.emit(REPOSITORY_CHANGE);
  }

  onChange(handler: () => void) {
    this.on(REPOSITORY_CHANGE, handler);
  }
}

// singleton
export default new WalletListRepository();