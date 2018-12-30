import * as React from "react";
import { UpdateIgnoredFactory } from "../usecase/UpdateIgnored";

export default (props: { ignored: boolean }) => {
  return (
    <tr id="ignore">
      <td colSpan={2}>
        <input
          type="checkbox"
          checked={props.ignored}
          onChange={e => UpdateIgnoredFactory.create().execute(e.target.checked)}
        />
        <label id="label-ignore">出力しない</label>
      </td>
    </tr>
  );
}