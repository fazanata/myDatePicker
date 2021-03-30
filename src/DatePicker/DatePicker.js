import React, { Component } from "react";

import DatePickerCal from "./DatePickerCal";
import "./DatePicker.css";
import { stringToDate, checkStrDateToMask } from "./helpers";

class DatePicker extends Component {
  constructor(props) {
    super(props);
    const {
      DateValue, DateValue2, type, lang
    } = props;
    this.onDayClick = this.onDayClick.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeCurrentMounth = this.onChangeCurrentMounth.bind(this);
    this.onChangeCurrentYear = this.onChangeCurrentYear.bind(this);
    this.onWeekClick = this.onWeekClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    var firstDate = DateValue !== undefined ? DateValue : new Date();
    var secondDate = DateValue2 !== undefined ? DateValue2 : new Date();
    var inputValue = checkStrDateToMask(null, lang);
    if (DateValue) {
      inputValue = DateValue.toLocaleDateString(lang);
    }
    if (DateValue && DateValue2) {
      inputValue = DateValue.toLocaleDateString(lang) + " - " + DateValue2.toLocaleDateString(lang);
    }
    
    var nullDate = DateValue === undefined ? true : false;
    

    this.state = {
      lang: lang,
      type: type,
      numberClicks: 2,
      stateCalendar: "open", //open -открыт по дате, scroll - листаем
      coverState: false,
      nullDate: nullDate, //не введена дата
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
      lang,
    } = this.state;
    
    return (
      <div className="DatePicker">
        <div className="MainContent">
          <input
            className="MainInput"
            type="text"
            placeholder="for input date..."
            value={inputDate}
            onChange={(e) => this.onInputChange(e)}
          />
          <DatePickerCal
            fullDate={displayedDate}
            type={type}
            lang={lang}
            stateCalendar={stateCalendar}
            selectedDate1={selectedDate1}
            selectedDate2={selectedDate2}
            coverState={coverState}
            onDayClick={this.onDayClick}
            onWeekClick={this.onWeekClick}
            onChangeState={this.onChangeState}
            onChangeCurrentYear={this.onChangeCurrentYear}
            onChangeCurrentMounth={this.onChangeCurrentMounth}
          />
        </div>
      </div>
    );
  }

  onInputChange(e) {
    console.log(e.target.value)
  }
  onDayClick(newDay, newMonth, newYear) {
    const newDate = new Date(newYear, newMonth, newDay);
    if (this.state.type === "1") {
      this.setState((state) => {
        return {
          selectedDate1: newDate,
          displayedDate: state.selectedDate1,
          inputDate: newDate.toLocaleDateString(state.lang),
        };
      });

      //this.onChangeState();
    } else {
      this.setState((state) => {
        let newNumberClicks;
        let data1 = null;
        let data2 = null;

        switch (state.numberClicks) {
          case 2:
            newNumberClicks = 1;
            data1 = newDate;
            data2 = newDate;
            break;
          case 1:
            newNumberClicks = 0;
            if (newDate < state.selectedDate1) {
              data2 = state.selectedDate1;
              data1 = newDate;
            } else {
              data2 = newDate;
              data1 = state.selectedDate1;
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
            data1.toLocaleDateString(state.lang) + " - " + data2.toLocaleDateString(state.lang),
        };
      });
    }
  }

  onWeekClick(newWeek) {
    var selectedDate1 = newWeek.find(x=>x!==null);
    var selectedDate2 = newWeek.reverse().find(x=>x!==null);
    this.setState((state) => {
      return {
        selectedDate1,
        displayedDate: selectedDate1,
        selectedDate2,
        inputDate: selectedDate1.toLocaleDateString(state.lang) + " - " + selectedDate2.toLocaleDateString(state.lang),
      };
    });
  }

  onChangeState() {
    console.log(new Date(this.state.inputDate, this.state.lang))
    this.setState((state) => {
      let date1 = new Date();
      let date2 = new Date();
      var inputValue = state.inputDate;
      var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      if (state.nullDate) {
       
        if (state.type === "1") {
          date1 = state.selectedDate1;
          inputValue = date1.toLocaleDateString(state.lang);
        }
        if (state.type === "2") {
          date1 = state.selectedDate1;
          date2 = state.selectedDate2;
          inputValue = date1.toLocaleDateString(state.lang) + " - " + date2.toLocaleDateString(state.lang);
        }
      } else {
         if (state.inputDate && state.type === "1") {
        //date1 = new Date(this.state.inputDate.replace(pattern, "$3-$2-$1"));
        date1 = stringToDate(state.inputDate, state.lang);
      }
      if (state.inputDate && state.type === "2") {
        var periods = this.state.inputDate.split(" - ");
        //date1 = new Date(periods[0].replace(pattern, "$3-$2-$1"));
        //date2 = new Date(periods[1].replace(pattern, "$3-$2-$1"));
        date1 = stringToDate(periods[0], state.lang);
        date2 = stringToDate(periods[1], state.lang);
      }
      }

      

     
      return {
        coverState: !state.coverState,
        inputDate: inputValue, 
        selectedDate1: date1,
        selectedDate2: date2,
        stateCalendar: "open",
        nullDate: false,
      };
    });
    
  }

  onChangeCurrentMounth(b) {
    let newMonth = this.state.displayedDate.getMonth();
    let newYear = this.state.displayedDate.getFullYear();
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
