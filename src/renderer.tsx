import * as ReactDOM from "react-dom";
import * as React from "react";

import App from "./component/App";
import Receipt from "./domain/Receipt";

const exampleState = {
  "image_path": "/Users/non/Desktop/receipt/IMG_0001.jpg",
  "date": "2018-01-01",
  "sum": 2000,
  "shop_name": "saven"
};

const jsonString = JSON.stringify(exampleState);
const testReceipt = Receipt.fromJSON(jsonString);

ReactDOM.render(<App {...testReceipt} />, document.getElementById("app"));