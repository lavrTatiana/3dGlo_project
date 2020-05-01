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
  countTimer('30 april 2020');
  
  // Menu 
  const toggleMenu = () => {
    const container = document.querySelectorAll('.container')[0],
          btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn');
          
    
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    // btnMenu.addEventListener('click', handlerMenu);
    container.addEventListener('click', (event) =>{
      let target = event.target;
      target = target.closest('.menu');
      if (target) {
        handlerMenu();
      }
    });

    menu.addEventListener('click', (event) => {
      let target = event.target;
      if (target === closeBtn) {
        handlerMenu();
      } 
      
      target = target.closest('ul');
      if (target) {
        handlerMenu();
      } 
      
    });


  };  
  toggleMenu();

  // Popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popUpBtn = document.querySelectorAll('.popup-btn'),
          popupContent = document.querySelector('.popup-content');

    let count = -100;
    let animateContainer;

    const popupAnimation = () => {
      count++; 
      popupContent.style.transform = `translateX(${count}%)`;
      if (count >= -5) {
        clearInterval(animateContainer);
      }
    }; 

    popUpBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        
        if (document.documentElement.clientWidth > 768) {
          animateContainer = setInterval(popupAnimation, 3);
          count = -100;
          popup.style.display = 'block';
        } else {
          popupContent.style.transform = `translateX(-10%)`;
          popup.style.display = 'block';
        }
      });
    });      

    popup.addEventListener('click', (event) => {
      let target = event.target;

        if (target.classList.contains('popup-close')) {
          popup.style.display = 'none';
        } else {
          target = target.closest('.popup-content');
          if (!target) {
            popup.style.display = 'none';
          }
        }
    });

  };
  togglePopUp();

  // Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
          target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();






});