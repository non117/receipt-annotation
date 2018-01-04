import * as React from "react";

export interface ItemProps { name: string; price: number; account: string }

export default class ItemRow extends React.PureComponent<ItemProps, {}> {
  render(): React.ReactNode {
    const { name, price, account } = this.props;
    return (
      <tr>
        <td className="operation">➖</td>
        <td>{name}</td>
        <td>{account}</td>
        <td>{price}</td>
      </tr>
    );
  }
}