import * as React from "react";

import { ChangeWalletFactory } from "../usecase/ChangeWallet";

export default (props: { walletNames: Array<string>, current: string }) => {
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