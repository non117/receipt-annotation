import * as fs from "fs";
import * as path from "path";
import * as moment from "moment";
import * as ReactDOM from "react-dom";
import * as React from "react";
import ReceiptContainer from "./component/ReceiptContainer";
import { LoadReceiptFactory } from "./usecase/LoadReceipt";
import { LoadSettingFactory } from "./usecase/LoadSetting";
import { LoadAccountListFactory } from "./usecase/LoadAccountList";
import receiptRepository from "./infrastructure/ReceiptRepository";

moment.locale("ja");

receiptRepository.onChange( () => { 
  const receipt = receiptRepository.get().getCurrent();
  ReactDOM.render(
    <ReceiptContainer receipt={receipt} />, document.getElementById("app")
  );
});

const settingPath = "./config/setting.json";
const accountsPath = "./config/accounts.json";
LoadSettingFactory.create().execute(settingPath);
LoadAccountListFactory.create().execute(accountsPath);
LoadReceiptFactory.create().execute();
