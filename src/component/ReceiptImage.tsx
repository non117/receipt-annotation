import * as React from "react";

export default (props: { imagePath: string }) => {
  return (
    <section id="receipt">
      <div id="receipt-image">
        <img src={props.imagePath} />
      </div>
    </section>
  );
}