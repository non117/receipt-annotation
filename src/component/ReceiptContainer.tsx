import * as React from "react";

import ReceiptImage from "./ReceiptImage";
import AccountSelector from "./AccountSelector";
import DateSelector from "./DateSelector";

import Receipt from "../domain/Receipt";

interface ReceiptProps {
  receipt: Receipt;
}

export default class ReceiptContainer extends React.PureComponent<ReceiptProps, {}> {
  render(): React.ReactNode {
    const { imagePath, account, date, sum } = this.props.receipt;
    return (
      <div>
        <section id="receipt">
          <ReceiptImage imagePath={imagePath} />
        </section>
        <section id="input">
          <AccountSelector accounts={[]} />
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
