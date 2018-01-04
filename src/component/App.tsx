import * as React from "react";

import ReceiptImage, { ReceiptImageProps } from "./ReceiptImage";
import AccountSelector from "./AccountSelector";
import DateSelector from "./DateSelector";
import ItemTable from "./ItemTable";
import { ItemProps } from "./ItemRow";

export interface AppProps {
  image: string;
  accounts: string[];
  date: string;
  items: ItemProps[];
  sum: number;
}

export default class App extends React.PureComponent<AppProps, {}> {
  render(): React.ReactNode {
    const { image, accounts, date, items, sum } = this.props;
    return (
      <div>
        <section id="receipt">
          <ReceiptImage imagePath={image} />
        </section>
        <section id="input">
          <AccountSelector accounts={accounts} />
          <DateSelector date={date} />
          <div>
            <button>🔃</button>
          </div>
          <ItemTable items={items} sum={sum}  />
          <div>
            <button id="register">登録</button>
          </div>
        </section>
      </div>
    );
  }
}