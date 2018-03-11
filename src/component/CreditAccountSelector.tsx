import * as React from "react";
import Account from "../domain/Account";
import accountListRepository from "../infrastructure/AccountListRepository";
import { SelectCreditAccountFactory } from "../usecase/SelectCreditAccount";

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
        <label>決済手段</label>
        <select value={selected}
          onChange={e => SelectCreditAccountFactory.create().execute(e.target.value)}>
          {creditAccountOptions}
        </select>
      </div>
    );
  }
}