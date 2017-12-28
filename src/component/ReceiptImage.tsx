import * as React from "react";

export interface ReceiptImageProps { imagePath: string }

export default class ReceiptImage extends React.PureComponent<ReceiptImageProps, {}> {
  render(): React.ReactNode {
    return (
      <section id="receipt">
        <iframe width="100%" height="600px" src={this.props.imagePath} scrolling="yes">
        </iframe>
      </section>
    );
  }
}