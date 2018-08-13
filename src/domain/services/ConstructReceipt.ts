import * as moment from "moment";
import Line from "../Line";
import Receipt from "../Receipt";
import Wallet from "../Wallet";

export default function constructReceipt(
  imagePath: string,
  lines: Array<Line>,
  wallet: Wallet,
): Receipt {
  const defaultDebitAccount = wallet.getDefaultDebitAccount();
  const defaultCreditAccount = wallet.getDefaultCreditAccount();
  const date = this.lines.filter(line => line.date())[0] || moment();
  const sum = this.lines.filter(line => line.sum())[0] || 0;
  const memo = this.lines.filter(line => line.findText(wallet.keywords))[0] || "";
  const creditAccount = wallet.accountList.findByFullName(wallet.keywords[memo]) || defaultCreditAccount;
  return new Receipt({
    imagePath,
    date,
    sum,
    memo,
    creditAccount,
    lines,
    debitAccount: defaultDebitAccount,
    ignored: false,
  });
}