import React, { Component } from "react";

import Month from "./Month";
import { getMonthName } from "./helpers";
import "./DatePickerCal.css";

class DatePickerCal extends Component {
  render() {
    const {
      fullDate,
      selectedDate1,
      selectedDate2,
      onDayClick,
      onChangeState,
      onChangeCurrentMounth,
      onChangeCurrentYear,
      coverState,
      stateCalendar,
      type,
    } = this.props;

    const dateMonth = stateCalendar === "scroll" ? fullDate : selectedDate1;

    const dateNumber = dateMonth.getDate();
    const monthNumber = dateMonth.getMonth();
    const yearNumber = dateMonth.getFullYear();
    const monthName = getMonthName(monthNumber);

    return (
      <div>
        {coverState ? (
          <div className="DatePickerCalContainer">
            <div className="DatePickerCalContainer__Title">
              <button onClick={() => onChangeCurrentMounth("sub")}>
                {"  <  "}
              </button>
              {"   " + monthName + "   "}
              <button onClick={() => onChangeCurrentMounth("add")}>
                {"  >  "}
              </button>
              <input
                type="number"
                value={yearNumber}
                size="2"
                onChange={(event) => onChangeCurrentYear(event.target.value)}
              />
              {"                          "}
              <button onClick={() => onChangeState()}>X</button>
            </div>
            <Month
              selectedDate1={selectedDate1}
              selectedDate2={selectedDate2}
              type={type}
              date={dateNumber}
              month={monthNumber}
              year={yearNumber}
              onDayClick={onDayClick}
            />
          </div>
        ) : (
          <button classname="inputButton" onClick={() => onChangeState()}>
            ....
          </button>
        )}
      </div>
    );
  }
}

export default DatePickerCal;
