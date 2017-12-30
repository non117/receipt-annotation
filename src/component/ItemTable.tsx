import * as React from "react";
import ItemRow, { ItemRowProps } from "./ItemRow";

export interface ItemTableProps { items: Array<ItemRowProps>; sum: number }

export default class ItemTable extends React.PureComponent<ItemTableProps, {}> {
  render(): React.ReactNode {
    const { items, sum } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th className="operation"></th>
            <th>Name</th>
            <th>Account</th>
            <th>Price</th>
          </tr>
        </thead>
        { items.map(item => <tr><ItemRow {...item} /></tr>)}
        <tr>
          <td className="operation"><button>➕</button></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td className="operation"></td>
          <td></td>
          <td>Sum</td>
          <td>{sum}</td>
        </tr>
      </table>
    );
  }
}