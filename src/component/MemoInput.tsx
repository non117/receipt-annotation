import React, { FC } from "react";
import { UpdateMemoFactory } from "../usecase/UpdateMemo";

export const MemoInput: FC<{ memo: string, disabled: boolean }> = (props) => {
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