import * as ReactDOM from "react-dom";
import * as React from "react";
import App from "./component/App";

const exampleState = {
  "image_path": "/Users/non/Desktop/receipt/IMG_0001.jpg",
  "accounts": ["hoge"],
  "date": "2018-01-01",
  "sum": 2000,
  "shop_name": "saven"
};

ReactDOM.render(<App {...exampleState} />, document.getElementById("app"));