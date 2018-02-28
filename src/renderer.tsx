import * as fs from "fs";
import * as moment from "moment";
import * as ReactDOM from "react-dom";
import * as React from "react";
import ReceiptContainer from "./component/ReceiptContainer";
import { LoadReceiptFactory } from "./usecase/LoadReceipt";
import receiptRepository from "./infrastructure/ReceiptRepository";

moment.locale("ja");

receiptRepository.onChange( () => { 
  const receipt = receiptRepository.get().getCurrent();
  ReactDOM.render(
    <ReceiptContainer receipt={receipt} />, document.getElementById("app")
  );
});

const jsonPath = "/Users/non/Desktop/output/receipts2.json";
LoadReceiptFactory.create().execute(jsonPath);
