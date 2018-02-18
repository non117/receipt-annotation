import * as fs from "fs";
import * as ReactDOM from "react-dom";
import * as React from "react";
import App from "./component/App";
import { LoadReceiptFactory } from "./usecase/LoadReceipt";

const jsonPath = "/Users/non/Desktop/output/receipts.json";
LoadReceiptFactory.create().execute(jsonPath);

ReactDOM.render(<App {...receipts[0]} />, document.getElementById("app"));