import * as React from "react";

import ReceiptImage from "./ReceiptImage";
import DebitAccountSelector from "./DebitAccountSelector";
import CreditAccountSelector from "./CreditAccountSelector";
import DateSelector from "./DateSelector";

import Receipt from "../domain/Receipt";
import { ExportReceiptFactory } from "../usecase/ExportReceipt";
import { UpdateMemoFactory } from "../usecase/UpdateMemo";
import { UpdateSumFactory } from "../usecase/UpdateSum";
import { UpdateIgnoredFactory } from "../usecase/UpdateIgnored";

interface ReceiptProps {
  receipt: Receipt;
  index: number;
  length: number;
}

export default class ReceiptContainer extends React.PureComponent<ReceiptProps, {}> {
  render(): React.ReactNode {
    const { imagePath, debitAccount, creditAccount, date, memo, sum, ignored } = this.props.receipt;
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
              {this.props.index + 1} / {this.props.length}
            </section>
            <section id="input">
              <div id="ignore">
                <label id="label-ignore">出力しない</label>
                <input type="checkbox" checked={ignored} onChange={e => UpdateIgnoredFactory.create().execute(e.target.checked)} />
              </div>
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
          </div>
        </div>
      </div>
    );
  }
}
