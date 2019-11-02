import React, { FC } from "react";

import { ChangeWalletFactory } from "../usecase/ChangeWallet";

export const WalletSelector: FC<{ walletNames: Array<string>, current: string }> = (props) => {
  const walletOptions = props.walletNames.map(walletName =>
    <option value={walletName} key={walletName}>{walletName}</option>
  );
  return (
    <div>
      <select
        value={props.current}
        onChange={e => ChangeWalletFactory.create().execute(e.target.value)}
      >
        {walletOptions}
      </select>
    </div>
  );
}