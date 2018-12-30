import * as React from "react";
import * as moment from "moment";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { UpdateDateFactory } from "../usecase/UpdateDate";

export default (props: { date: moment.Moment, disabled: boolean }) => {
  return (
    <tr>
      <td>
        <label>日付</label>
      </td>
      <td>
        <DatePicker
          disabled={props.disabled}
          selected={props.date}
          onChange={date => UpdateDateFactory.create().execute(date)}
        />
      </td>
    </tr>
  );
};