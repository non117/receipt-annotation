import * as React from "react";

import ReceiptImage, { ReceiptImageProps } from "./ReceiptImage";
import AccountSelector, { AccountSelectorProps } from "./AccountSelector";
import DateSelector, { DateSelectorProps } from "./DateSelector";
import ItemTable, { ItemTableProps } from "./ItemTable";

export interface AppProps {
  image: ReceiptImageProps;
  account: AccountSelectorProps;
  date: DateSelectorProps;
  items: ItemTableProps;
}

export default class App extends React.PureComponent<AppProps, {}> {
  render(): React.ReactNode {
    const { image, account, date, items } = this.props;
    return (
      <div>
        <section id="receipt">
          <ReceiptImage {...image} />
        </section>
        <section id="input">
          <AccountSelector {...account} />
          <DateSelector {...date} />
          <div>
            <button>🔃</button>
          </div>
          <ItemTable {...items} />
          <div>
            <button id="register">登録</button>
          </div>
        </section>
      </div>
    );
  }
}