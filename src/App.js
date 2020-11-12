import React, { Component } from "react";

import DatePicker from "./DatePicker";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "",
    };
  }

  render() {
    const dateValue1 = "01.11.2020";
    const dateValue2 = "19.11.2020";
    return (
      <div className="App">
        <DatePicker DateValue={dateValue1} type="1" />
        <DatePicker DateValue={dateValue1} DateValue2={dateValue2} type="2" />
      </div>
    );
  }
}

export default App;
