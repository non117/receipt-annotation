import * as React from "react";

import ReceiptImage from "./ReceiptImage";
import DebitAccountSelector from "./DebitAccountSelector";
import CreditAccountSelector from "./CreditAccountSelector";
import DateSelector from "./DateSelector";

import Receipt from "../domain/Receipt";
import { MovePrevFactory } from "../usecase/MovePrev";
import { MoveNextFactory } from "../usecase/MoveNext";
import { ExportReceiptFactory } from "../usecase/ExportReceipt";
import { UpdateMemoFactory } from "../usecase/UpdateMemo";
import { UpdateSumFactory } from "../usecase/UpdateSum";

interface ReceiptProps {
  receipt: Receipt;
  index: number;
  max: number;
}

export default class ReceiptContainer extends React.PureComponent<ReceiptProps, {}> {
  render(): React.ReactNode {
    const { imagePath, debitAccount, creditAccount, date, memo, sum } = this.props.receipt;
    return (
      <div id="wrapper">
        <h1 id="title">Receipt Annotator</h1>
        <button id="button-save" onClick={() => ExportReceiptFactory.create().execute()}>Save</button>
        <div id="container">
          <section id="receipt">
            <ReceiptImage imagePath={imagePath} />
          </section>
          <div id="input-and-action">
            <section id="info">
              {this.props.index} / {this.props.max}
            </section>
            <section id="input">
              <DebitAccountSelector debitAccount={debitAccount} />
              <CreditAccountSelector creditAccount={creditAccount} />
              <DateSelector date={date} />
              <div id="memo">
                <label id="label-memo">メモ</label>
                <input type="text" value={memo} onChange={e => UpdateMemoFactory.create().execute(e.target.value)} id="input-memo" />
              </div>
              <div id="price">
                <label id="label-price">合計</label>
                <input type="text" value={String(sum)}
                  onChange={e => UpdateSumFactory.create().execute(e.target.value)} id="input-price" />
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
