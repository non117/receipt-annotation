import * as fs from "fs";
import * as path from "path";
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
  const receipt = receiptListRepository.get().getCurrent();
  ReactDOM.render(
    <ReceiptContainer receipt={receipt} />, document.getElementById("app")
  );
});

const settingsPath = "./config/settings.json";
const accountsPath = "./config/accounts.json";
LoadSettingFactory.create().execute(settingsPath);
LoadAccountListFactory.create().execute(accountsPath);
LoadReceiptListFactory.create().execute();
