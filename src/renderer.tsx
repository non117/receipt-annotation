import * as fs from "fs";
import * as ReactDOM from "react-dom";
import * as React from "react";

import App from "./component/App";
import ReceiptDeserializer from "./infrastructure/ReceiptDeserializer";

const jsonPath = "/Users/non/Desktop/output/receipts.json";

const rawJson = fs.readFileSync(jsonPath).toString();
const receipts = ReceiptDeserializer.deserializeFromString(rawJson);

ReactDOM.render(<App {...receipts[0]} />, document.getElementById("app"));