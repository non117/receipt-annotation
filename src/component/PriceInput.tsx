import * as React from "react";
import { UpdateSumFactory } from "../usecase/UpdateSum";

export default (props: { sum: number, disabled: boolean }) => {
  return (
    <tr id="price">
      <td>
        <label id="label-price">合計</label>
      </td>
      <td>
        <input type="text" value={String(props.sum)} disabled={props.disabled}
          onChange={e => UpdateSumFactory.create().execute(e.target.value)} id="input-price" />
      </td>
    </tr>
  );
}