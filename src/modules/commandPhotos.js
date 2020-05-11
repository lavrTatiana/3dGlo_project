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

export default commandPhotos;