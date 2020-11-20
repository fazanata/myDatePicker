import React, { Component } from "react";

import Weekday from "./Weekday";
import Day from "./Day";
import { weekdaysLang, abbreviationForWeekday, getWeeksForMonth } from "./helpers";

class Month extends Component {
  constructor(props) {
    super(props);

    this.renderWeek = this.renderWeek.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = {
      hoveredDate: null,
    };
  }

  render() {
    const { month, year, onWeekClick, lang } = this.props;
    const weekdays = weekdaysLang[lang];
    const week = getWeeksForMonth(month, year);
    const weeksMarkup = week.map((week, index) => {
      return (
        <div>
        <div role="row" className="Week" key={index}>
          <button onClick= {() => onWeekClick(week)} /> 
          {week.map(this.renderWeek)}
        </div>
        </div>
      );
    });

    const weekDaysMarkup = weekdays.map((weekday) => {
      return (
        <Weekday
          key={weekday}
          title={abbreviationForWeekday(weekday,lang)}
          current={true}
          label={weekday}
        />
      );
    });

    return (
      <div className="MonthContainer">
        <div className="WeekdayContainer">{weekDaysMarkup}</div>
        {weeksMarkup}
      </div>
    );
  }

  renderWeek(fullDate, dayIndex) {
    const { onDayClick, selectedDate1, selectedDate2, type } = this.props;
    const { hoveredDate } = this.state;

    if (fullDate == null) {
      return <Day key={dayIndex} />;
    }

    const date = fullDate.getDate();
    const month = fullDate.getMonth();
    const year = fullDate.getFullYear();

    let selected1 =
      date === selectedDate1.getDate() &&
      month === selectedDate1.getMonth() &&
      year === selectedDate1.getFullYear();
    let selected2 =
      date === selectedDate2.getDate() &&
      month === selectedDate2.getMonth() &&
      year === selectedDate2.getFullYear();
    let today = new Date();

    let selectedPeriod =
      fullDate > selectedDate1 && fullDate < selectedDate2 && type === "2"
        ? true
        : false;
    return (
      <Day
        key={dayIndex}
        fullDate={fullDate}
        onClick={onDayClick}
        selected={selected1 || selected2}
        selectedPeriod={selectedPeriod}
        today={
          date === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear()
        }
        hovering={date === hoveredDate}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
    );
  }

  handleMouseEnter(date) {
    this.setState({
      hoveredDate: date,
    });
  }

  handleMouseLeave() {
    this.setState({
      hoveredDate: null,
    });
  }
}

export default Month;
