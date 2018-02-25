import * as React from "react";

import ReceiptImage from "./ReceiptImage";
import AccountSelector from "./AccountSelector";
import DateSelector from "./DateSelector";

import Receipt from "../domain/Receipt";
import { MovePrevFactory } from "../usecase/MovePrev";
import { MoveNextFactory } from "../usecase/MoveNext";
import { UpdateSumFactory } from "../usecase/UpdateSum";

interface ReceiptProps {
  receipt: Receipt;
}

export default class ReceiptContainer extends React.PureComponent<ReceiptProps, {}> {
  render(): React.ReactNode {
    const { imagePath, account, date, sum } = this.props.receipt;
    const sumChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      UpdateSumFactory.create().execute(e.target.value);
    }
    return (
      <div>
        <section id="receipt">
          <ReceiptImage imagePath={imagePath} />
        </section>
        <section id="input">
          <AccountSelector accounts={[]} />
          <DateSelector date={date} />
          <input type="text" value={String(sum)} onChange={sumChangeHandler} />
        </section>
        <section id="action">
          <button onClick={() => MovePrevFactory.create().execute()}>Prev</button>
          <button onClick={() => MoveNextFactory.create().execute()}>Next</button>
        </section>
      </div>
    );
  }
}
