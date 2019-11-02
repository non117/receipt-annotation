import React, { useEffect, useState, useRef} from "react";
import Account from "../domain/Account";
import walletListRepository from "../infrastructure/WalletListRepository";
import { SelectDebitAccountFactory } from "../usecase/SelectDebitAccount";

interface Props {
  debitAccount: Account;
  disabled: boolean;
  index: number;
}

export const DebitAccountSelector: React.FunctionComponent<Props> = ({
  debitAccount,
  disabled,
  index
}) => {
  const [prevIndex, setIndex] = useState(index);
  const inputRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    if (prevIndex !== index && inputRef.current) {
      setIndex(index);
      inputRef.current.focus();
    }
  }, [index]);
  const selected = debitAccount && debitAccount.fullName;
  const debitAccounts = walletListRepository.get().getCurrent().accountList.filterDebit();
  const debitAccountOptions = debitAccounts.map(account => (
    <option value={account.fullName} key={account.fullName}>
      {account.name}
    </option>
  ));
  return (
    <tr>
      <td>
        <label>勘定科目</label>
      </td>
      <td>
        <select
          value={selected}
          ref={inputRef}
          disabled={disabled}
          onChange={e =>
            SelectDebitAccountFactory.create().execute(e.target.value)
          }
        >
          {debitAccountOptions}
        </select>
      </td>
    </tr>
  );
};
