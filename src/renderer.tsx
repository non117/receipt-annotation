import * as fs from "fs";
import * as ReactDOM from "react-dom";
import * as React from "react";
import App from "./component/App";
import { LoadReceiptFactory } from "./usecase/LoadReceipt";
import receiptRepository from "./infrastructure/ReceiptRepository";

receiptRepository.onChange( () => ReactDOM.render(<App />, document.getElementById("app")) );

const jsonPath = "/Users/non/Desktop/output/receipts.json";
LoadReceiptFactory.create().execute(jsonPath);
