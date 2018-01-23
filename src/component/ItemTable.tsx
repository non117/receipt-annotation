import * as React from "react";
import ItemRow, { ItemProps } from "./ItemRow";

interface ItemsProps { items: ItemProps[]; sum: number }

export default class ItemTable extends React.PureComponent<ItemsProps, {}> {
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
        <tbody>
          { items.map(item => <ItemRow key={item.name} {...item} />)}
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
        </tbody>
      </table>
    );
  }
}