import moment from "moment";
import ReactDOM from "react-dom";
import React from "react";
import { ReceiptContainer } from "./component/ReceiptContainer";
import { LoadSettingFactory } from "./usecase/LoadSetting";
import { LoadWalletListFactory } from "./usecase/LoadWalletList";
import { OcrReceiptFactory } from "./usecase/OcrReceipt";
import { RegisterKeyEventFactory } from "./usecase/RegisterKeyEvent";
import receiptListRepository from "./infrastructure/ReceiptListRepository";
import settingRepository from "./infrastructure/SettingRepository";
import walletListRepository from "./infrastructure/WalletListRepository";

moment.locale("ja");
// TODO: IPCでsaveしたいがほぼやる必要がない
const settingsPath = "./config/settings.json";
const walletsPath = "./config/wallets.json";
LoadSettingFactory.create().execute(settingsPath);
LoadWalletListFactory.create().execute(walletsPath);

OcrReceiptFactory.create().execute();
RegisterKeyEventFactory.create().execute();

const renderHandler = () => {
  const receiptList = receiptListRepository.get();
  const walletList = walletListRepository.get();
  if (receiptList.length() > 0) {
    ReactDOM.render(
      <ReceiptContainer
        receipt={receiptList.getCurrent()}
        index={receiptList.currentIndex}
        length={receiptList.length()}
        currentWallet={walletList.getCurrent().name}
        walletNames={walletList.getWalletNames()}
      />, document.getElementById("app")
    );
  }
};

receiptListRepository.onChange(renderHandler);
settingRepository.onChange(renderHandler);
renderHandler();
