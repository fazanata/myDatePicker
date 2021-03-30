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
    const date1 = new Date(2020, 10, 2);
    const date2 = new Date(2020, 11, 29);
    const mask = "";
    return (
      <div className="App">
        <div> ваш язык в браузере - {lang}</div>
        <div>сегодня - {date.toLocaleString(lang, options)}</div>
        <div>DatePicker DateValue={new Date(2020, 10, 2).toLocaleDateString(lang)} type="1" lang={lang}</div>
        <DatePicker DateValue={date1} type="1" lang={lang}/>
        <div>DatePicker DateValue={new Date(2020, 10, 2).toLocaleDateString(lang)} DateValue2={new Date(2020, 11, 29).toLocaleDateString(lang)} type="2" lang={lang}</div>
        <DatePicker DateValue={date1} DateValue2={date2} type="2" lang={lang}/>

        <div>Вызов компонента без данных </div>
        <DatePicker type="1" lang={lang} />
        <div>Вызов компонента для ввода периода с пустыми данными </div>
        <DatePicker type="2" lang={lang} />
      </div>
    );
  }
}

export default App;
//https://overcoder.net/q/959945/%D0%B4%D0%BE%D0%B1%D0%B0%D0%B2%D0%B8%D1%82%D1%8C-%D0%BC%D0%B0%D1%81%D0%BA%D1%83-%D0%B2%D0%B2%D0%BE%D0%B4%D0%B0-%D0%B2-react-datepicker
