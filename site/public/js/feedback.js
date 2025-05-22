var carousel = document.querySelector('.carousel');
var items = document.querySelectorAll('.carousel-item');
var containerWidth = carousel.clientWidth;
var itemWidth = 150;
var gap = 20;
var activeIndex = 2;

let municipios = [
  "ABC",
  "Centro",
  "Grande São Paulo",
  "Vale do Paraíba",
  "Campinas",
  "Sorocaba",
  "Baixada Santista",
  "Ribeirão Preto",
  "São Carlos",
  "Bauru",
  "Marília",
  "Araçatuba",
  "Presidente Prudente",
  "São José do Rio Preto",
  "Piracicaba",
  "Macro Região",
  "Vale do Ribeira"
];

var select = document.getElementById("selectMunicipios");
municipios.forEach((m) => {
  var opt = document.createElement("option");
  opt.value = m;
  opt.textContent = m;
  select.appendChild(opt);
});


function posicionarItens() {
  var centerX = containerWidth / 2;
  items.forEach((item, index) => {
    
    var offset = (index - activeIndex) * (itemWidth + gap);

    var left = centerX - itemWidth /2 + offset;
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

function goToAuth(){
  location.replace("/autenticacao.html");
}

function goToInicio(){
  location.replace("/");
}

function enviarFeedback(button){
  button.innerHTML = `<img class="loading-gif" src="./assets/gifs/gif-carregando.gif" alt="Carregando..."/>`
  
  setTimeout(() => {
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
      </svg>
    `
    document.getElementById("overlay").classList.add("active");
    document.getElementById("modal").classList.add("active");
  }, 1000)

}

document.getElementById("close-modal").addEventListener("click", function(){
    document.getElementById("overlay").classList.remove("active");
    document.getElementById("modal").classList.remove("active");

});
document.getElementById("overlay").addEventListener("click", function(){
    document.getElementById("overlay").classList.remove("active");
    document.getElementById("modal").classList.remove("active");

});

var sideBar = document.querySelector(".side-bar");

function openSidebar(){
  var body  = document.querySelector(".body");

  if(sideBar.classList.contains("active")){

    sideBar.classList.remove("active");
  }else{

    sideBar.classList.add("active");
  
      // Adicionar o listener após um delay
    setTimeout(() => {
      document.addEventListener('click', clickOutsideHandler);
    }, 50);
}

  console.log(sideBar);
}

var clickOutsideHandler = (event) => {
  if (!sideBar.contains(event.target)) {
    sideBar.classList.remove("active");
    // Remover o listener após fechar a siedbar
    document.removeEventListener('click', clickOutsideHandler);
  }
};
function goToHistory(){
  location.href = "/#historia"
}

function goToCrenca(){
  location.href = "/#crenca"
}

function goToFeedback(){
  location.href = "/#feedback"
}