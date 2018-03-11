import * as React from "react";

import ReceiptImage from "./ReceiptImage";
import AccountSelector from "./AccountSelector";
import DateSelector from "./DateSelector";

import Receipt from "../domain/Receipt";
import { MovePrevFactory } from "../usecase/MovePrev";
import { MoveNextFactory } from "../usecase/MoveNext";
import { ExportReceiptFactory } from "../usecase/ExportReceipt";
import { UpdateSumFactory } from "../usecase/UpdateSum";

interface ReceiptProps {
  receipt: Receipt;
}

export default class ReceiptContainer extends React.PureComponent<ReceiptProps, {}> {
  render(): React.ReactNode {
    const { imagePath, debitAccount, creditAccount, date, sum } = this.props.receipt;
    const sumChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      UpdateSumFactory.create().execute(e.target.value);
    }
    return (
      <div id="wrapper">
        <h1 id="title">Receipt Annotator</h1>
        <button id="button-save" onClick={() => ExportReceiptFactory.create().execute()}>Save</button>
        <div id="container">
          <section id="receipt">
            <ReceiptImage imagePath={imagePath} />
          </section>
          <div id="input-and-action">
            <section id="input">
              <AccountSelector accounts={[]} />
              <DateSelector date={date} />
              <div id="price">
                <label id="label-price">Price</label>
                <input type="text" value={String(sum)} onChange={sumChangeHandler} id="input-price" />
              </div>
            </section>
            <section id="action">
              <button className="button-action" onClick={() => MovePrevFactory.create().execute()}>Prev</button>
              <button className="button-action" onClick={() => MoveNextFactory.create().execute()}>Next</button>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
