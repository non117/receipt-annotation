import * as React from "react";
import * as moment from "moment";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { UpdateDateFactory } from "../usecase/UpdateDate";

interface DateSelectorProps { date: moment.Moment, disabled: boolean }

export default class DateSelector extends React.PureComponent<DateSelectorProps, {}> {
  render(): React.ReactNode {
    return (
      <tr>
        <td>
          <label>日付</label>
        </td>
        <td>
          <DatePicker
            disabled={this.props.disabled}
            selected={this.props.date}
            onChange={date => UpdateDateFactory.create().execute(date)}
          />
        </td>
      </tr>
    );
  }
}