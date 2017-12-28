import * as React from "react";

export interface AccountSelectorProps { accounts: Array<string> }

export default class AccountSelector extends React.PureComponent<AccountSelectorProps, {}> {
  render(): React.ReactNode {
    return (
      <div>
        <label>Account</label>
        <select value={null}>
          {this.props.accounts}
        </select>
      </div>
    );
  }
}