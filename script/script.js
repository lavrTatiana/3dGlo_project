window.addEventListener('DOMContentLoaded', function(){
  'use strict';

  // Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds'),
        timeInterval = 0;


    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor((timeRemaining / 60 / 60));
          // day = Math.floor((timeRemaining / 60) / 60 /24);
          

      return {timeRemaining, hours, minutes, seconds};
    }
    
    function updateClock() {
      let timer = getTimeRemaining();
      if (timer.hours < 10) {
        timerHours.textContent = ('0' + timer.hours).slice(-2);
      } else {
        timerHours.textContent = timer.hours;
      }
      timerMinutes.textContent = ('0' + timer.minutes).slice(-2);
      timerSeconds.textContent = ('0' + timer.seconds).slice(-2);

      if(timer.timeRemaining > 0){
        setTimeout(updateClock, 1000);
      } else {
        clearInterval(timeInterval);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    
    }

    timeInterval = setInterval(updateClock, 1000);
    updateClock();
  }

  countTimer('29 april 2020');
  










});