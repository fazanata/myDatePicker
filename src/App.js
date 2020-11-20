import React, { Component } from "react";
import Calendar from "react-datepicker";
import MaskedTextInput from "react-text-mask";


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
    var options = {
      era: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    var date = new Date();
    var lang = navigator.browserLanguage || navigator.language || navigator.userLanguage;
    
    return (
      <div className="App">
        <div> ваш язык в браузере - {lang}</div>
        <div>сегодня - {date.toLocaleString(lang, options)}</div>
        <div>DatePicker DateValue={dateValue1} type="1" lang={lang}</div>
        <DatePicker DateValue={dateValue1} type="1" lang={lang}/>
        <div>DatePicker DateValue={dateValue1} DateValue2={dateValue2} type="2" lang={lang}</div>
        <DatePicker DateValue={dateValue1} DateValue2={dateValue2} type="2" lang={lang}/>
        
      </div>
    );
  }
}

export default App;
