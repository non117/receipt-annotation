import * as React from "react";
import Account from "../domain/Account";
import walletListRepository from "../infrastructure/WalletListRepository";
import { SelectCreditAccountFactory } from "../usecase/SelectCreditAccount";

export default (props: { creditAccount: Account, disabled: boolean }) => {
  const selected = props.creditAccount && props.creditAccount.fullName;
  const creditAccounts = walletListRepository.get().getCurrent().accountList.filterCredit();
  const creditAccountOptions = creditAccounts.map(account =>
    <option value={account.fullName} key={account.fullName}>{account.name}</option>
  );
  return (
    <tr>
      <td>
        <label>決済手段</label>
      </td>
      <td>
        <select value={selected}
          disabled={props.disabled}
          onChange={e => SelectCreditAccountFactory.create().execute(e.target.value)}>
          {creditAccountOptions}
        </select>
      </td>
    </tr>
  );
}