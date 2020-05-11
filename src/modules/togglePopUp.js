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

export default togglePopUp;