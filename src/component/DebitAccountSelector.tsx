import * as React from "react";
import Account from "../domain/Account";
import accountListRepository from "../infrastructure/AccountListRepository";
import { SelectDebitAccountFactory } from "../usecase/SelectDebitAccount";

interface DebitAccountSelectorProps { debitAccount: Account, disabled: boolean }

export default class DebitAccountSelector extends React.PureComponent<DebitAccountSelectorProps, {}> {
  render(): React.ReactNode {
    const selected = this.props.debitAccount && this.props.debitAccount.fullName;
    const debitAccounts = accountListRepository.get().filterDebit();
    const debitAccountOptions = debitAccounts.map(account =>
      <option value={account.fullName} key={account.fullName}>{account.name}</option>
    );
    return (
      <tr>
        <td>
          <label>勘定科目</label>
        </td>
        <td>
          <select value={selected}
            disabled={this.props.disabled}
            onChange={e => SelectDebitAccountFactory.create().execute(e.target.value)}>
            {debitAccountOptions}
          </select>
        </td>
      </tr>
    );
  }
}