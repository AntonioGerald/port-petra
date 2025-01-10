const prestasi = document.querySelector('.prestasi');
const prestasiContainer = document.querySelectorAll('.prestasi-container'); 


const prestasiWidth = prestasiContainer[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);


function scrollKiri() {
    prestasi.scrollBy({
    left: -cardWidth,
    behavior: 'smooth',
  });
}

function scrollKanan() {
    prestasi.scrollBy({
    left: cardWidth,
    behavior: 'smooth',
  });
}


const leftBtn = document.querySelector('.scroll-btn.left');
const rightBtn = document.querySelector('.scroll-btn.right');

function updateButtons() {
    console.log('ScrollLeft:', cardWrapper.scrollLeft);
    console.log('ScrollWidth:', cardWrapper.scrollWidth);
    console.log('OffsetWidth:', cardWrapper.offsetWidth);
  
    leftBtn.disabled = cardWrapper.scrollLeft === 0;
    rightBtn.disabled =
      cardWrapper.scrollLeft + cardWrapper.offsetWidth >= cardWrapper.scrollWidth;
  }
  

cardWrapper.addEventListener('scroll', updateButtons);

updateButtons();
