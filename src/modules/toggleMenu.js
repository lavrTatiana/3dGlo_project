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

export default toggleMenu;