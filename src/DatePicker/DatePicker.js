import React, { Component } from "react";

import DatePickerCal from "./DatePickerCal";
import "./DatePicker.css";

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.onDayClick = this.onDayClick.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeCurrentMounth = this.onChangeCurrentMounth.bind(this);
    this.onChangeCurrentYear = this.onChangeCurrentYear.bind(this);

    var firstDate = new Date();
    var secondDate = new Date();

    var inputValue = "";
    if (props.DateValue) {
      var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      inputValue = props.DateValue;
      if (props.DateValue2) {
        inputValue = props.DateValue + " - " + props.DateValue2;
        secondDate = new Date(props.DateValue2.replace(pattern, "$3-$2-$1"));
      }
      firstDate = new Date(props.DateValue.replace(pattern, "$3-$2-$1"));
    }
    this.state = {
      type: props.type,
      numberClicks: 2,
      stateCalendar: "open", //open -открыт по дате, scroll - листаем
      coverState: false,
      selectedDate1: firstDate,
      selectedDate2: secondDate,
      displayedDate: firstDate,
      inputDate: inputValue,
      currentMonthSelected: firstDate.getMonth(),
      currentYearSelected: firstDate.getFullYear(),
    };
  }

  render() {
    const {
      selectedDate1,
      selectedDate2,
      coverState,
      displayedDate,
      inputDate,
      stateCalendar,
      type,
    } = this.state;

    return (
      <div className="DatePicker">
        <div className="MainContent">
          <input
            className="MainInput"
            type="text"
            placeholder="for input date..."
            value={inputDate}
          />
          <DatePickerCal
            fullDate={displayedDate}
            type={type}
            stateCalendar={stateCalendar}
            selectedDate1={selectedDate1}
            selectedDate2={selectedDate2}
            coverState={coverState}
            onDayClick={this.onDayClick}
            onChangeState={this.onChangeState}
            onChangeCurrentYear={this.onChangeCurrentYear}
            onChangeCurrentMounth={this.onChangeCurrentMounth}
          />
        </div>
      </div>
    );
  }

  onDayClick(newDay, newMonth, newYear) {
    const newDate = new Date(newYear, newMonth, newDay);
    if (this.state.type === "1") {
      this.setState((state) => {
        return {
          selectedDate1: newDate,
          displayedDate: this.state.selectedDate1,
          inputDate: newDate.toLocaleDateString(),
        };
      });

      this.onChangeState();
    } else {
      this.setState((state) => {
        let newNumberClicks;
        let data1 = null;
        let data2 = null;

        switch (this.state.numberClicks) {
          case 2:
            newNumberClicks = 1;
            data1 = newDate;
            data2 = newDate;
            break;
          case 1:
            newNumberClicks = 0;
            if (newDate < this.state.selectedDate1) {
              data2 = this.state.selectedDate1;
              data1 = newDate;
            } else {
              data2 = newDate;
              data1 = this.state.selectedDate1;
            }
            break;
          case 0:
            newNumberClicks = 1;
            data1 = newDate;
            data2 = newDate;
            break;
        }

        return {
          numberClicks: newNumberClicks,
          selectedDate1: data1,
          selectedDate2: data2,
          inputDate:
            data1.toLocaleDateString() + " - " + data2.toLocaleDateString(),
        };
      });
    }
  }

  onChangeState() {
    this.setState((state) => {
      let date1 = new Date();
      let date2 = new Date();
      var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;

      if (state.inputDate && state.type === "1") {
        date1 = new Date(this.state.inputDate.replace(pattern, "$3-$2-$1"));
      }
      if (state.inputDate && state.type === "2") {
        var periods = this.state.inputDate.split(" - ");
        date1 = new Date(periods[0].replace(pattern, "$3-$2-$1"));
        date2 = new Date(periods[1].replace(pattern, "$3-$2-$1"));
      }
      return {
        coverState: !state.coverState,
        selectedDate1: date1,
        selectedDate2: date2,
        stateCalendar: "open",
      };
    });
  }

  onChangeCurrentMounth(b) {
    let newMonth = this.state.displayedDate.getMonth();
    let newYear = this.state.displayedDate.getFullYear();
    console.log("curr month ", this.state.currentMonthSelected);
    if (b === "sub") {
      if (this.state.currentMonthSelected === 0) {
        newMonth = 12;
        newYear = newYear - 1;
      } else {
        newMonth = newMonth - 1;
      }
    }
    if (b === "add") {
      if (this.state.currentMonthSelected === 11) {
        newMonth = 0;
        newYear = newYear + 1;
      } else {
        newMonth = newMonth + 1;
      }
    }

    const { selectedDate, displayedDate } = this.state;

    this.setState((state) => {
      const newDate = new Date(
        newYear,
        newMonth,
        state.displayedDate.getDate()
      );
      
      return {
        displayedDate: newDate,
        currentMonthSelected: newMonth,
        currentYearSelected: newYear,
        stateCalendar: "scroll",
      };
    });
  }

  onChangeCurrentYear(y) {
    this.setState((state) => {
      const newDate = new Date(
        y,
        state.currentMonthSelected,
        state.displayedDate.getDate()
      );
      console.log("new date = ", newDate);
      return {
        displayedDate: newDate,
        currentYearSelected: y,
        stateCalendar: "scroll",
      };
    });
  }
}

export default DatePicker;
