const toggleMenu = () => {
  const menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn');
  
  const handlerMenu = () => {
    menu.classList.toggle('active-menu');
  };

  document.querySelector('body').addEventListener('click', (event) => {
    let target = event.target;
    if (!target.closest('.active-menu') && !target.closest('.menu')) {
      menu.classList.remove('active-menu');
    }

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

export default toggleMenu;