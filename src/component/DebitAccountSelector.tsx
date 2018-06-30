import * as React from "react";
import Account from "../domain/Account";
import walletListRepository from "../infrastructure/WalletListRepository";
import { SelectDebitAccountFactory } from "../usecase/SelectDebitAccount";

interface DebitAccountSelectorProps { debitAccount: Account, disabled: boolean, index: number }
interface DebitAccountSelectorState { index: number, changed: boolean }

export default class DebitAccountSelector extends React.PureComponent<DebitAccountSelectorProps, DebitAccountSelectorState> {
  inputRef: React.RefObject<HTMLSelectElement>;
  constructor(props: DebitAccountSelectorProps) {
    super(props);
    this.state = { index: props.index, changed: true };
    this.inputRef = React.createRef();
  }
  static getDerivedStateFromProps(props: DebitAccountSelectorProps, currentState: DebitAccountSelectorState) {
    if (currentState.index !== props.index) {
      return { index: props.index, changed: true };
    }
    return { index: props.index, changed: false };
  }
  componentDidMount() {
    this.inputRef.current.focus();
  }
  componentDidUpdate() {
    if (this.state.changed) {
      this.inputRef.current.focus();
    }
  }
  render(): React.ReactNode {
    const selected = this.props.debitAccount && this.props.debitAccount.fullName;
    const debitAccounts = walletListRepository.get().getCurrent().accountList.filterDebit();
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
            ref={this.inputRef}
            disabled={this.props.disabled}
            onChange={e => SelectDebitAccountFactory.create().execute(e.target.value)}>
            {debitAccountOptions}
          </select>
        </td>
      </tr>
    );
  }
}