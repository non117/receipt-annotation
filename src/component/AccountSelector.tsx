import * as React from "react";

export interface AccountSelectorProps { accounts: string[] }

export default class AccountSelector extends React.PureComponent<AccountSelectorProps, {}> {
  render(): React.ReactNode {
    return (
      <div>
        <label>Account</label>
        <select value={undefined}>
          {this.props.accounts}
        </select>
      </div>
    );
  }
}