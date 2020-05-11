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

export default calc;