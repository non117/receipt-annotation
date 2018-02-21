import * as React from "react";
import ReceiptContainer from "./ReceiptContainer";
import receiptRepository from "../infrastructure/ReceiptRepository";

export default class App extends React.PureComponent<{}, {}> {
  render(): React.ReactNode {
    const receipt = receiptRepository.get().getCurrent();
    return (
      <div>
        <ReceiptContainer receipt={receipt} />
      </div>
    );
  }
}