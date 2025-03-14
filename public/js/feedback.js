const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const containerWidth = carousel.clientWidth;
const itemWidth = 150;
const gap = 20;
let activeIndex = 2; 

function posicionarItens() {
  const centerX = containerWidth / 2;
  items.forEach((item, index) => {
    
    const offset = (index - activeIndex) * (itemWidth + gap);

    const left = centerX - itemWidth/2 + offset;
    item.style.left = left + 'px';


    if (index === activeIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}
posicionarItens();

// Adiciona o evento de clique para cada item
items.forEach(item => {
  item.addEventListener('click', () => {
    activeIndex = parseInt(item.getAttribute('data-index'));
    posicionarItens();
  });
});