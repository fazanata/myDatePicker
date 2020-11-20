const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const monthsLang = {
  "en": [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
],
  "ru": [
    "Январь",  "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
  ],
  "fr": [
    "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"
  ]
}

export function getMonthName(lang, index) {
  const monthsLangL = monthsLang[lang]
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

export const weekdaysLang = { 
  "en": [
    "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"
],
  "ru": [
    "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"
  ],
  "fr": [
    "Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"
  ]
}

export function abbreviationForWeekday(weekday) {
  const weekDayRus = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
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
