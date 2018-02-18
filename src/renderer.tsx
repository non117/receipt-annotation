import * as fs from "fs";
import * as ReactDOM from "react-dom";
import * as React from "react";
import App from "./component/App";

const jsonPath = "/Users/non/Desktop/output/receipts.json";

ReactDOM.render(<App {...receipts[0]} />, document.getElementById("app"));