import React, { Component } from "react";

import Month from "./Month";
import { getMonthName } from "./helpers";
import "./DatePicker.css";

class DatePicker extends Component {
  render() {
    const { fullDate, onDayClick, onChangeState, coverState } = this.props;

    const dateNumber = fullDate.getDate();
    const monthNumber = fullDate.getMonth();
    const yearNumber = fullDate.getFullYear();
    const monthName = getMonthName(monthNumber);

    return (
      <div>
        {coverState ? (
          <div className="DatePickerContainer">
            <div className="DatePickerContainer__Title">{monthName}</div>
            <Month
              date={dateNumber}
              month={monthNumber}
              year={yearNumber}
              onDayClick={onDayClick}
            />
          </div>
        ) : (
          <button classname="inputButton" onClick={()=>onChangeState()}>....</button>
        )}
      </div>
    );
  }
}

export default DatePicker;
