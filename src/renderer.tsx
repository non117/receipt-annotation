import * as moment from "moment";
import * as ReactDOM from "react-dom";
import * as React from "react";
import ReceiptContainer from "./component/ReceiptContainer";
import { LoadReceiptListFactory } from "./usecase/LoadReceiptList";
import { LoadSettingFactory } from "./usecase/LoadSetting";
import { LoadAccountListFactory } from "./usecase/LoadAccountList";
import receiptListRepository from "./infrastructure/ReceiptListRepository";

moment.locale("ja");

receiptListRepository.onChange( () => { 
  const receiptList = receiptListRepository.get();
  ReactDOM.render(
    <ReceiptContainer
      receipt={receiptList.getCurrent()}
      index={receiptList.currentIndex}
      max={receiptList.length}
    />, document.getElementById("app")
  );
});

const settingsPath = "./config/settings.json";
const accountsPath = "./config/accounts.json";
LoadSettingFactory.create().execute(settingsPath);
LoadAccountListFactory.create().execute(accountsPath);
LoadReceiptListFactory.create().execute();