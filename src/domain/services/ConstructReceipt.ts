import moment from "moment";
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
  const date = lines.map(line => line.date()).filter(x => x)[0] || moment();
  const sum = Math.max(...lines.map(line => line.sum()).filter(x => x)) | 0;
  const memo = lines.map(line => line.findText(Object.keys(wallet.keywords)))[0] || "";
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

export const emptyReceipt = (wallet: Wallet) => new Receipt({
  imagePath: '',
  date: moment(),
  sum: 0,
  memo: '',
  creditAccount: wallet.getDefaultCreditAccount(),
  lines: [],
  debitAccount: wallet.getDefaultDebitAccount(),
  ignored: false,
})