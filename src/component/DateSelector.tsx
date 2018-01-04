import * as React from "react";

interface DateSelectorProps { date: string }

export default class DateSelector extends React.PureComponent<DateSelectorProps, {}> {
  render(): React.ReactNode {
    return (
      <div>
        <label>Date</label>
        <input type="text" size={20} maxLength={20} />
        <button>📅</button>
      </div>
    );
  }
}