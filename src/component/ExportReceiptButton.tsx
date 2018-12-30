import * as React from "react";
import { ExportReceiptFactory } from "../usecase/ExportReceipt";

interface ExportReceiptButtonState {
  message: string;
}

export default class ExportReceiptButton extends React.Component<{}, ExportReceiptButtonState> {
  constructor(props: {}) {
    super(props);
    this.state = { message: "" }
  }
  onSaveSuccess() {
    this.setState({ message: "saved!" });
    window.setTimeout(() => {
      this.setState({ message: "" });
    }, 2000);
  }
  onSaveFailure(error: Error) {
    this.setState({ message: error.message });
  }
  render(): React.ReactNode {
    const onButtonClick = () => {
      const exportReceipt = ExportReceiptFactory.create();
      exportReceipt.execute().then(
        this.onSaveSuccess.bind(this)
      ).catch(
        this.onSaveFailure.bind(this)
      );
    };
    return (
      <div>
        <button id="button-save" onClick={onButtonClick}>Save</button>
        <label>{ this.state.message }</label>
      </div>
    );
  }
}