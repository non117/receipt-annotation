import React, { FC } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { UpdateDateFactory } from "../usecase/UpdateDate";

export const DateSelector: FC<{ date: moment.Moment, disabled: boolean }> = (props) => {
  return (
    <tr>
      <td>
        <label>日付</label>
      </td>
      <td>
        <DatePicker
          disabled={props.disabled}
          selected={props.date.toDate()}
          onChange={date => UpdateDateFactory.create().execute(moment(date))}
        />
      </td>
    </tr>
  );
};