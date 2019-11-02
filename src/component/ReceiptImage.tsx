import React, { FC } from "react";

export const ReceiptImage: FC<{ imagePath: string }> = (props) => {
  return (
    <section id="receipt">
      <div id="receipt-image">
        <img src={props.imagePath} />
      </div>
    </section>
  );
}