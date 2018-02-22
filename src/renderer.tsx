import * as fs from "fs";
import * as ReactDOM from "react-dom";
import * as React from "react";
import ReceiptContainer from "./component/ReceiptContainer";
import { LoadReceiptFactory } from "./usecase/LoadReceipt";
import receiptRepository from "./infrastructure/ReceiptRepository";

receiptRepository.onChange( () => { 
  const receipt = receiptRepository.get().getCurrent();
  ReactDOM.render(
    <ReceiptContainer receipt={receipt} />, document.getElementById("app")
  );
});

const jsonPath = "/Users/non/Desktop/output/receipts.json";
LoadReceiptFactory.create().execute(jsonPath);
