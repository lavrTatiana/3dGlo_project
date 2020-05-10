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
  countTimer('11 may 2020');
  
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

  // Slider
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
          btn = document.querySelectorAll('.portfolio-btn'),
          dots = document.querySelector('.portfolio-dots'),
          slider = document.querySelector('.portfolio-content');
          
    
    let currentSlide = 0,
        interval;

    slide.forEach(() => {
      let li = document.createElement('li');
      li.classList.add('dot');
      dots.appendChild(li);
      
    });

    let dot = dots.querySelectorAll('.dot');

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    };

    const startSlide = (time = 2000) => {

      interval = setInterval(autoPlaySlide, time);

    };
    
    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      
      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')){
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')){
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length){
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || (event.target.matches('.dot'))) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || (event.target.matches('.dot'))) {
        startSlide();
      }
    });

    startSlide(1500);

  };
  slider();

  // Сommand photo
  const commandPhotos = () => {

    const commandPhoto = document.querySelectorAll('.command__photo');

    commandPhoto.forEach((item) => {
      let anotherImg;
      item.addEventListener('mouseenter', (event) => {
        anotherImg = event.target.src;
        event.target.src = event.target.dataset.img;
      });

      item.addEventListener('mouseleave', (event) => {
        event.target.src = anotherImg;
      });
    });

  };
  commandPhotos();

  // Calculator
  const calc = (price = 100) => {

    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcDay = document.querySelector('.calc-day'),
          calcCount = document.querySelector('.calc-count'),
          totalValue = document.getElementById('total'),
          input = calcBlock.querySelectorAll('input');

    let total = 0;

    const countSum = () => {
      let countValue = 1,
          dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      // totalValue.textContent = Math.floor(total);
    };

    input.forEach((item) => {
      item.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/\D/g, '');
      });
    });

    function animate({ duration, draw, timing }) {
      
      let start = performance.now();

        requestAnimationFrame(function animate(time) {

        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) {
          timeFraction = 1;
        }  
        let progress = timing(timeFraction);
        draw(progress);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
      });
  }  
    calcBlock.addEventListener('change', (event) => {

      const target = event.target;
      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    
      animate({
        duration: 3000,
        timing(timeFraction) {
          return timeFraction;
        },
        draw(progress) {
          totalValue.textContent = Math.floor(progress * total);
        }
      });
    });  
  };
  
  calc(100);

  // send-ajax-form
  const sendForm = () => {

    const errorMessage = 'Что-то пошло не так',
          loadMessage = 'Загрузка...',
          successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';
    
    const forms = document.querySelectorAll('form'),
          // form = document.getElementById('form1'),
          // footerForm = document.getElementById('form2'),
          popUpForm = document.getElementById('form3'),
          formPhone = document.querySelectorAll('.form-phone'),
          formName = document.querySelectorAll('.form-name'),
          formMess = document.querySelector('.mess'),
          spiner = document.querySelector('.loadingio-spinner-spinner-8pz25s3zj4w');

    formPhone.forEach((item) => {
      item.addEventListener('keypress', e => {
        // Отменяем ввод не цифр
        if(!/[\+\d]/.test(e.key)) {
          e.preventDefault();
        }
      });

    });      
    
    formName.forEach((item) => {
      item.addEventListener('keypress', (e) => {
        // Отменяем ввод не букв и не пробелов
        if(!/[А-Яа-яЁё\s]/.test(e.key)) {
          e.preventDefault();
        }
      });
    }); 

    formMess.addEventListener('keypress', (e) => {
      // Отменяем ввод не букв и не пробелов
      if(!/[А-Яа-яЁё\s]/.test(e.key)) {
        e.preventDefault();
      }
    });

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: white;';
    
    
    forms.forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.appendChild(statusMessage);
        
        statusMessage.appendChild(spiner);
  
        const formData = new FormData(form);
        let body = {};      
        formData.forEach((val, key) => {
          body[key] = val;
        });
  
        
        postData(body)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('Status network is not 200');
            }
            statusMessage.removeChild(spiner);
            statusMessage.textContent = successMessage;
          })
          .catch((error) => {
            statusMessage.removeChild(spiner);
            statusMessage.textContent = errorMessage;
            console.error(error);
          });
        
  
        clearInputs(form);
      });
    });
    

    const postData = (body) => {
      
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });      
    
    };

    const clearInputs = (elem) => {
      let inputs = elem.querySelectorAll('input');
      inputs.forEach((i) => {
        i.value = '';
      });
    };

  };
  sendForm();
  
  



});