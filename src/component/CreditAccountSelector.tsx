import * as React from "react";
import Account from "../domain/Account";
import accountListRepository from "../infrastructure/AccountListRepository";

interface CreditAccountSelectorProps { creditAccount: Account }

export default class CreditAccountSelector extends React.PureComponent<CreditAccountSelectorProps, {}> {
  render(): React.ReactNode {
    const selected = this.props.creditAccount && this.props.creditAccount.fullName;
    const creditAccounts = accountListRepository.get().filterCredit();
    const creditAccountOptions = creditAccounts.map(account =>
      <option value={account.fullName} key={account.fullName}>{account.name}</option>
    );
    return (
      <div>
        <label>Credit</label>
        <select value={selected}>
          {creditAccountOptions}
        </select>
      </div>
    );
  }
}