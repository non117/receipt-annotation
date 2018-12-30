import * as React from "react";
import { UpdateMemoFactory } from "../usecase/UpdateMemo";

export default (props: { memo: string, disabled: boolean }) => {
  return (
    <tr id="memo">
      <td>
        <label id="label-memo">メモ</label>
      </td>
      <td>
        <input type="text" disabled={props.disabled} value={props.memo}
          onChange={e => UpdateMemoFactory.create().execute(e.target.value)} id="input-memo" />
      </td>
    </tr>
  )
}