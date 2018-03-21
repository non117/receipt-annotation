import Account, { AccountType } from "../domain/Account";
import Receipt from "../domain/Receipt";

export default class ReceiptQifConverter {
  static execute(receipts: Array<Receipt>): string {
    const accountReceiptMap = receipts.reduce((acc: Map<Account, Receipt[]>, receipt: Receipt) => {
        const sameAccountReceipts = acc.get(receipt.creditAccount) || [];
        return acc.set(receipt.creditAccount, [...sameAccountReceipts, receipt]);
      },
      new Map<Account, Receipt[]>()
    )
    let qif = "!Clear:AutoSwitch\n";
    for(const [account, receipts] of accountReceiptMap) {
      qif = qif.concat(
        this.convertAccount(account),
        ...receipts.map(this.convertReceipt)
      );
    }
    return qif;
  }
  static convertAccount(account: Account): string {
    return `!Account
      N${account.fullName}
      ^
      !Type:${qifAccountType(account.type)}
      `;
  }
  static convertReceipt(receipt: Receipt): string {
    return `D${receipt.date.format("L")}
      T-${receipt.sum}
      M${receipt.memo}
      L${receipt.debitAccount.fullName}
      ^
      `;
  }
}

function qifAccountType(accountType: AccountType): string {
  switch(accountType) {
    case AccountType.CASH:
      return "Cash";
    case AccountType.BANK:
      return "Bank";
    case AccountType.CREDIT:
      return "CCard";
    default: // ???
      return "Cash";
  }
}