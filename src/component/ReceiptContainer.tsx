import * as React from "react";

import ReceiptImage from "./ReceiptImage";
import DebitAccountSelector from "./DebitAccountSelector";
import CreditAccountSelector from "./CreditAccountSelector";
import DateSelector from "./DateSelector";
import ExportReceiptButton from "./ExportReceiptButton";

import Receipt from "../domain/Receipt";
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
    const disabled = ignored;
    return (
      <div id="wrapper">
        <h1 id="title">Receipt Annotator</h1>
        <ExportReceiptButton />
        <div id="container">
          <section id="receipt">
            <ReceiptImage imagePath={imagePath} />
          </section>
          <div id="input-and-action">
            <section id="info">
              {this.props.index + 1} / {this.props.length}
            </section>
            <section id="input">
              <table>
                <tbody>
                  <tr id="ignore">
                    <td colSpan={2}>
                      <input type="checkbox" checked={ignored} onChange={e => UpdateIgnoredFactory.create().execute(e.target.checked)} />
                      <label id="label-ignore">出力しない</label>
                    </td>
                  </tr>
                  <DebitAccountSelector debitAccount={debitAccount} disabled={disabled} />
                  <CreditAccountSelector creditAccount={creditAccount} disabled={disabled} />
                  <DateSelector date={date} disabled={disabled} />
                  <tr id="price">
                    <td>
                      <label id="label-price">合計</label>
                    </td>
                    <td>
                    <input type="text" value={String(sum)} disabled={disabled}
                      onChange={e => UpdateSumFactory.create().execute(e.target.value)} id="input-price" />
                    </td>
                  </tr>
                  <tr id="memo">
                    <td>
                      <label id="label-memo">メモ</label>
                    </td>
                    <td>
                      <input type="text" disabled={disabled} value={memo}
                        onChange={e => UpdateMemoFactory.create().execute(e.target.value)} id="input-memo" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
