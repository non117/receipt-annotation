import * as React from "react";

export interface ItemRowProps { name: string; price: number; account: string }

export default class ItemRow extends React.PureComponent<ItemRowProps, {}> {
  render(): React.ReactNode {
    const { name, price, account } = this.props;
    return (
      <tr>
        <td className="operation">➖</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>{account}</td>
      </tr>
    );
  }
}