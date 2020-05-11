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

export default slider;