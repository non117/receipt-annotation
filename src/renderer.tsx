import * as moment from "moment";
import * as ReactDOM from "react-dom";
import * as React from "react";
import ReceiptContainer from "./component/ReceiptContainer";
import { LoadReceiptListFactory } from "./usecase/LoadReceiptList";
import { LoadSettingFactory } from "./usecase/LoadSetting";
import { LoadAccountListFactory } from "./usecase/LoadAccountList";
import { RegisterKeyEventFactory } from "./usecase/RegisterKeyEvent";
import receiptListRepository from "./infrastructure/ReceiptListRepository";
import settingRepository from "./infrastructure/SettingRepository";

moment.locale("ja");
const settingsPath = "./config/settings.json";
const accountsPath = "./config/accounts.json";
LoadSettingFactory.create().execute(settingsPath);
LoadAccountListFactory.create().execute(accountsPath);
LoadReceiptListFactory.create().execute();
RegisterKeyEventFactory.create().execute();

const renderHandler = () => { 
  const receiptList = receiptListRepository.get();
  ReactDOM.render(
    <ReceiptContainer
      receipt={receiptList.getCurrent()}
      index={receiptList.currentIndex}
      length={receiptList.length}
    />, document.getElementById("app")
  );
};

receiptListRepository.onChange(renderHandler);
settingRepository.onChange(renderHandler);
renderHandler();