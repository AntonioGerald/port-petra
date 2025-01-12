const prestasi = document.querySelector('.prestasi'); 
const prestasiContainer = document.querySelector('.prestasi-container'); 
const scroll = 2;
const cards = document.querySelectorAll('.card-prestasi'); 


const prestasiWidth = (cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight)) * scroll;

function scrollKiri() {
    prestasiContainer.scrollBy({
        left: -prestasiWidth,
        behavior: 'smooth',
    });
}

function scrollKanan() {
    prestasiContainer.scrollBy({
        left: prestasiWidth,
        behavior: 'smooth',
    });
}

const leftBtn = document.querySelector('.scroll-btn.left');
const rightBtn = document.querySelector('.scroll-btn.right');

function updateButtons() {
    console.log('ScrollLeft:', prestasiContainer.scrollLeft);
    console.log('ScrollWidth:', prestasiContainer.scrollWidth);
    console.log('OffsetWidth:', prestasiContainer.offsetWidth);
  
    leftBtn.disabled = prestasiContainer.scrollLeft === 0;
    rightBtn.disabled =
    prestasiContainer.scrollLeft + prestasiContainer.offsetWidth >= prestasiContainer.scrollWidth;
  }
  

  prestasiContainer.addEventListener('scroll', updateButtons);

updateButtons();
