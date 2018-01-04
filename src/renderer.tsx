import * as ReactDOM from "react-dom";
import * as React from "react";
import App from "./component/App";

const exampleState = {
  "image": { "imagePath": "/Users/non/Desktop/receipt/IMG_0001.jpg" },
  "account": { "accounts": ["hoge"] },
  "date": { "date": "2018-01-01" },
  "items": {
    "items": [
      { "name": "a", "price": 1000, "account": "" },
      { "name": "b", "price": 1000, "account": "" }
    ],
    "sum": 2000
  }
};

ReactDOM.render(<App {...exampleState} />, document.getElementById("app"));