import * as React from "react";

interface ReceiptImageProps { imagePath: string }

export default class ReceiptImage extends React.PureComponent<ReceiptImageProps, {}> {
  render(): React.ReactNode {
    return (
      <section id="receipt">
        <div id="receipt-image">
          <img src={this.props.imagePath}/>
        </div>
      </section>
    );
  }
}