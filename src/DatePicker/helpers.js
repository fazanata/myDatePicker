import { monthsLang, weekdaysLang, dateFormat} from "./localeParams";

export function getMonthName(lang, index) {
  const monthsLangL = monthsLang[lang] || monthsLang["en"];
  return monthsLangL[index];
}

export const weekdays = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

export function abbreviationForWeekday(weekday) {
  return weekday.substring(0, 3);
}

const WEEK_LENGTH = 7;

export function getWeeksForMonth(month, year) {
  const firstOfMonth = new Date(year, month, 1);
  let firstDayOfWeek = firstOfMonth.getDay();

  //for russian week
  if (firstDayOfWeek === 0) {
    firstDayOfWeek = 6;
  } else {
    firstDayOfWeek = firstDayOfWeek - 1;
  }
  //end of russian week + weekdays translate

  const weeks = [[]];
  let currentWeek = weeks[0];
  let currentDate = firstOfMonth;

  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }

  while (currentDate.getMonth() === month) {
    if (currentWeek.length === WEEK_LENGTH) {
      currentWeek = [];
      weeks.push(currentWeek);
    }

    currentWeek.push(currentDate);
    currentDate = new Date(year, month, currentDate.getDate() + 1);
  }

  while (currentWeek.length < 7) {
    currentWeek.push(null);
  }

  return weeks;
}

export function stringToDate(_date,lang)
{

  const _format = dateFormat[lang];
  //var _delimiter = _format.match(/\W/g)[0];
  
  let _delimiter = (_date.indexOf('/') >= 0 ) ? '/' : '.';
  if (_date.indexOf('-') >= 0 ) _delimiter='-';
  
  var formatLowerCase=_format.toLowerCase();
  var formatItems=formatLowerCase.split(_delimiter);
  
  var dateItems=_date.split(_delimiter);
  
  
  var monthIndex=(formatItems.indexOf("mm") >=0 ) ? formatItems.indexOf("mm") : formatItems.indexOf("m");
  
  var dayIndex=(formatItems.indexOf("dd") >=0 ) ? formatItems.indexOf("dd") : formatItems.indexOf("d");
  
  var yearIndex=(formatItems.indexOf("yyyy") >= 0 ) ? formatItems.indexOf("yyyy") : formatItems.indexOf("yy");
  
  var month=parseInt(dateItems[monthIndex]);
  month-=1;
  
  var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
  
  return formatedDate;

}

export function checkStrDateToMask(_date, lang) {
  const _format = dateFormat[lang];
  if (_date === null) {
    let newStr = _format.toLowerCase().replace( /m|d|y/g, '_');
    return newStr
  } else {
    
  }
}