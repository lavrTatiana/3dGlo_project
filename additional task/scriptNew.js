// Добрый день (утро, вечер, ночь в зависимости от времени суток)
// Сегодня: Понедельник
// Текущее время:12:05:15 PM
// До нового года осталось 175 дней

'use strict';

let greeting = document.getElementById('greeting'),
    weekDay = document.getElementById('weekDay'),
    realTime = document.getElementById('realTime'),
    toNY = document.getElementById('toNY');

let week = {
  0 : 'Sunday',
  1 : 'Monday',
  2 : 'Tuesday',
  3 : 'Wednesday',
  4 : 'thursday',
  5 : 'Friday',
  6 : 'Saturday'
};

// Работаем с сегодняшним днем
let date = new Date(),
    day = date.getDay(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

// Дата НГ 
let dateNY = new Date ('1 january 2021');    

let determinePartOfDay = function(){
  
  if (hours < 5) {
    greeting.textContent = 'Good night!';
  } else if (hours >= 5 && hours < 12) {
    greeting.textContent = 'Good morning';
  } else if (hours >= 12 && hours < 17) {
    greeting.textContent = 'Good afternoon!';
  } else {
    greeting.textContent = 'Good evening!';
  }
};

let determineWeekDay = function(){
  for (let key in week) {
    if (+key === day) {
      weekDay.textContent = 'Today is ' + week[key];
    }
  }
};

let determineTime = function(){
  let ampm = hours >= 12 ? 'pm' : 'am',
      hoursAMPM = hours % 12,
      textHoursAMPM = '',
      textMinutes = '',
      textSeconds = '';

  if (hoursAMPM < 10 ) {
    textHoursAMPM = ('0' + hoursAMPM).slice(-2);
  } 
  textMinutes = ('0' + minutes).slice(-2);
  textSeconds = ('0' + seconds).slice(-2);
  realTime.textContent = `The real time is ${textHoursAMPM} : ${textMinutes} : ${textSeconds} ${ampm}`;
};

let determineDaysToNY = function() {
  let rest = Math.floor((dateNY.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
  toNY.textContent = `${rest} days left before the New Year`;

};


determinePartOfDay();
determineWeekDay();
determineTime();
determineDaysToNY();