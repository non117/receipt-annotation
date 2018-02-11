import * as React from "react";

import ReceiptImage from "./ReceiptImage";
import AccountSelector from "./AccountSelector";
import DateSelector from "./DateSelector";

export interface AppProps {
  image_path: string;
  accounts: string[];
  date: string;
  sum: number;
  shop_name: string;
}

export default class App extends React.PureComponent<AppProps, {}> {
  render(): React.ReactNode {
    const { image_path, accounts, date, sum } = this.props;
    return (
      <div>
        <section id="receipt">
          <ReceiptImage imagePath={image_path} />
        </section>
        <section id="input">
          <AccountSelector accounts={accounts} />
          <DateSelector date={date} />
          <input type="text" defaultValue={String(sum)} />
          <div>
            <button id="register">登録</button>
          </div>
        </section>
      </div>
    );
  }
}