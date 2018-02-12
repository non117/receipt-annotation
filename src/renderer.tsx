import * as fs from "fs";
import * as ReactDOM from "react-dom";
import * as React from "react";

import App from "./component/App";
import Receipt from "./domain/Receipt";

const jsonPath = "/Users/non/Desktop/output/receipts.json";

const rawJson = fs.readFileSync(jsonPath).toString();
const receipts = JSON.parse(rawJson, (key: string, value: any) => {
  if (value instanceof Array) {
    return value.map(Receipt.fromJSON);
  } else {
    return value;
  }
});

ReactDOM.render(<App {...receipts[0]} />, document.getElementById("app"));