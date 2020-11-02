import React, { Component } from "react";

import DatePicker from "./DatePicker";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.onDayClick = this.onDayClick.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.state = {
      coverState: false,
      selectedDate: new Date(),
    };
  }

  render() {
    const { selectedDate, coverState } = this.state;

    return (
      <div className="App">
        <div className="MainContent">
          <input className="MainInput" type="text" placeholder="for input date..." />
          <DatePicker
            fullDate={selectedDate}
            coverState={coverState}
            onDayClick={this.onDayClick}
            onChangeState={this.onChangeState}
          />
        </div>
      </div>
    );
  }

  onDayClick(newDay) {
    const { selectedDate } = this.state;

    this.setState({
      selectedDate: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        newDay
      ),
    });
  }

  onChangeState() {
    
    this.setState({
      coverState: !this.state.coverState
    })
    console.log('onchange', this.state.coverState)
  }
}

export default App;
