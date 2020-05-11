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

export default sendForm;