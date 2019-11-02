import React, { FC } from "react";

import { CreditAccountSelector } from "./CreditAccountSelector";
import { DebitAccountSelector } from "./DebitAccountSelector";
import { DateSelector } from "./DateSelector";
import { ExportReceiptButton } from "./ExportReceiptButton";
import { IgnoreInput } from "./IgnoreInput";
import { MemoInput } from "./MemoInput";
import { PriceInput } from "./PriceInput";
import { ReceiptImage } from "./ReceiptImage";
import { WalletSelector } from "./WalletSelector";

import Receipt from "../domain/Receipt";

import { AddEmptyReceiptFactory } from "../usecase/AddEmptyReceipt"

const PageInfo: FC<{ index: number, length: number }> = (props) => {
  return (
    <section id="info">
      {props.index + 1} / {props.length}
    </section>
  );
}

const Input: FC<{receipt: Receipt, index: number}> = ({ receipt, index }) => {
  const { debitAccount, creditAccount, date, memo, sum, ignored } = receipt;
  return (
    <section id="input">
      <table>
        <tbody>
          <IgnoreInput ignored={ignored} />
          <DateSelector date={date} disabled={ignored} />
          <DebitAccountSelector debitAccount={debitAccount} disabled={ignored} index={index} />
          <CreditAccountSelector creditAccount={creditAccount} disabled={ignored} />
          <PriceInput sum={sum} disabled={ignored} />
          <MemoInput memo={memo} disabled={ignored} />
        </tbody>
      </table>
      <button onClick={() => AddEmptyReceiptFactory.create().execute()}>Add Empty Receipt</button>
    </section>
  );
}

interface ContainerProps {
  receipt: Receipt;
  index: number;
  length: number;
  currentWallet: string;
  walletNames: Array<string>;
}

export const ReceiptContainer: FC<ContainerProps> = (props) => {
  return (
    <div id="wrapper">
      <h1 id="title">Receipt Annotator</h1>
      <ExportReceiptButton />
      <WalletSelector walletNames={props.walletNames} current={props.currentWallet} />
      <div id="container">
        <ReceiptImage imagePath={props.receipt.imagePath} />
        <div id="input-and-action">
          <PageInfo index={props.index} length={props.length} />
          <Input receipt={props.receipt} index={props.index} />
        </div>
      </div>
    </div>
  );
}
