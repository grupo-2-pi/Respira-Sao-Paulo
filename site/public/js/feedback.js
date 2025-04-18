var carousel = document.querySelector('.carousel');
var items = document.querySelectorAll('.carousel-item');
var containerWidth = carousel.clientWidth;
var itemWidth = 150;
var gap = 20;
var activeIndex = 2;


var municipios = ["Adamantina","Adolfo","Aguaí","Águas da Prata","Águas de Lindóia","Águas de Santa Bárbara","Águas de São Pedro","Agudos","Alambari","Alfredo Marcondes","Altair","Altinópolis","Alto Alegre","Alumínio","Andradina","Angatuba","Anhembi","Anhumas","Aparecida","Apiaí","Araçariguama","Araçatuba","Araçoiaba da Serra","Aramina","Arandu","Arapeí","Araraquara","Araras","Arealva","Areias","Areiópolis","Ariranha","Artur Nogueira","Avaré","Avanhandava","Bady Bassitt","Balbinos","Bandeirantes","Barão de Antonina","Barbosa","Bariri","Barra Bonita","Barra do Turvo","Barretos","Barrinha","Barueri","Bastos","Batatais","Bauru","Bebedouro","Bento de Abreu","Bernardino de Campos","Bertioga","Bilac","Birigui","Biritiba-Mirim","Boa Esperança do Sul","Bocaina","Bom Jesus dos Perdões","Bom Sucesso de Itararé","Borá","Boracéia","Borborema","Borebi","Botucatu","Bragança Paulista","Braúna","Brejo Alegre","Brodowski","Buritama","Buritizal","Cabreúva","Caçapava","Cachoeira Paulista","Caconde","Cafelândia","Caiabu","Caieiras","Caiuá","Cajamar","Cajati","Cajobi","Cajuru","Campina do Monte Alegre","Campinas","Campo Limpo Paulista","Campos do Jordão","Campos Novos Paulista","Cananéia","Canas","Cândido Mota","Cândido Rodrigues","Capão Bonito","Capela do Alto","Capivari","Caraguatatuba","Carapicuíba","Cardoso","Casa Branca","Cássia dos Coqueiros","Castilho","Catanduva","Catiguá","Cedral","Cerqueira César","Cerquilho","Cesário Lange","Charqueada","Chavantes","Clementina","Colina","Colômbia","Conchal","Conchas","Coroados","Coronel Macedo","Corumbataí","Cosmópolis","Cotia","Cravinhos","Cristais Paulista","Cruzália","Cruzeiro","Cubatão","Cunha","Descalvado","Diadema","Dirce Reis","Divinolândia","Dobrada","Dois Córregos","Dolcinópolis","Dourado","Dracena","Duartina","Dumont","Echaporã","Eldorado","Elias Fausto","Elisiário","Embaúba","Emilianópolis","Engenheiro Coelho","Espírito Santo do Pinhal","Espírito Santo do Turvo","Estiva Gerbi","Estrela d'Oeste","Estrela do Norte","Euclides da Cunha Paulista","Fartura","Fernando Prestes","Fernandópolis","Ferraz de Vasconcelos","Flora Rica","Flórida Paulista","Florínea","Franca","Francisco Morato","Franco da Rocha","Gabriel Monteiro","Gália","Garça","Gastão Vidigal","Gavião Peixoto","General Salgado","Getulina","Glicério","Guaiçara","Guaimbê","Guaíra","Guapiaçu","Guapiara","Guará","Guaraçaí","Guaraci","Guarani d'Oeste","Guarantã","Guararapes","Guararema","Guaratinguetá","Guareí","Guariba","Guarujá","Guarulhos","Guatapará","Herculândia","Holambra","Hortolândia","Iacanga","Iacri","Iaras","Ibaté","Ibirá","Ibiporanga","Ibiúna","Igarapava","Igaratá","Iguape","Ilha Comprida","Ilha Solteira","Ilhabela","Indaiatuba","Indiana","Indiaporã","Inúbia Paulista","Ipaussu","Iperó","Ipeúna","Ipiguá","Iporanga","Ipuã","Iracemápolis","Irapuã","Irapuru","Itaberá","Itaju","Itanhaém","Itapecerica da Serra","Itapetininga","Itapeva","Itapevi","Itapira","Itapirapuã Paulista","Itápolis","Itaporanga","Itapuí","Itapura","Itaquaquecetuba","Itararé","Itariri","Itatiba","Itatinga","Itirapina","Itirapuã","Itobi","Itu","Itupeva","Ituverava","Jaborandi","Jaboticabal","Jacareí","Jaci","Jacupiranga","Jaguariúna","Jales","Jambeiro","Jandira","Jardinópolis","Jarinu","Jaú","Jeriquara","Joanópolis","José Bonifácio","Júlio Mesquita","Jundiaí","Junqueirópolis","Juquiá","Jurubatuba","Lagoa Santa","Laranjal Paulista","Lavínia","Leme","Lençóis Paulista","Limeira","Lindóia","Lins","Lorena","Lourdes","Louveira","Lucélia","Lucianópolis","Luís Antônio","Luiziânia","Lupércio","Lutécia","Macatuba","Macaubal","Macedônia","Magda","Mairinque","Mairiporã","Manduri","Marabá Paulista","Maracaí","Marapoama","Mariápolis","Marília","Marinópolis","Martinópolis","Matão","Mauá","Mendonça","Meridiano","Mesópolis","Miguelópolis","Miracatu","Mirandópolis","Mirante do Paranapanema","Mirassol","Mirassolândia","Mococa","Mogi das Cruzes","Mogi Guaçu","Moji Mirim","Mombuca","Monções","Monte Alegre do Sul","Monte Alto","Monte Aprazível","Monte Azul Paulista","Monte Castelo","Monte Mor","Monteiro Lobato","Morro Agudo","Morungaba","Motuca","Murutinga do Sul","Nantes","Narandiba","Natividade da Serra","Nazaré Paulista","Neves Paulista","Nhandeara","Nipoã","Nova Aliança","Nova Campina","Nova Canaã Paulista","Nova Castilho","Nova Europa","Nova Granada","Nova Guataporanga","Nova Independência","Nova Odessa","Novais","Novo Horizonte","Nuporanga","Ocauçu","Óleo","Olímpia","Onda Verde","Oriente","Orlândia","Osasco","Oscar Bressane","Osvaldo Cruz","Ourinhos","Ouro Verde","Ouroeste","Pacaembu","Palmares Paulista","Palmeira d'Oeste","Palmital","Panorama","Paraguaçu Paulista","Paraibuna","Paraíso","Paranapanema","Paranapuã","Paranapiacaba","Parapuã","Pardinho","Pariquera-Açu","Parisi","Patrocínio Paulista","Paulicéia","Paulínia","Paulistânia","Paulo de Faria","Pederneiras","Pedra Bela","Pedranópolis","Pedregulho","Pedreira","Penápolis","Pereira Barreto","Pereiras","Peruíbe","Piacatu","Piedade","Pilar do Sul","Pindamonhangaba","Pindorama","Pinhalzinho","Piquerobi","Piracaia","Piracicaba","Piracicamirim","Pirapora do Bom Jesus","Pirapozinho","Pirassununga","Piratininga","Pitangueiras","Planalto","Platina","Poá","Poloni","Pompéia","Pongaí","Pontal","Pontalinda","Pontes Gestal","Populina","Porangaba","Porto Feliz","Porto Ferreira","Potim","Potirendaba","Pracinha","Pradópolis","Praia Grande","Pratânia","Presidente Alves","Presidente Bernardes","Presidente Epitácio","Presidente Prudente","Presidente Venceslau","Promissão","Quadra","Quatá","Queiroz","Queluz","Quintana","Rafard","Rancharia","Redenção da Serra","Regente Feijó","Reginópolis","Registro","Restinga","Ribeira","Ribeirão Bonito","Ribeirão Branco","Ribeirão Corrente","Ribeirão do Sul","Ribeirão dos Índios","Ribeirão Grande","Ribeirão Pires","Ribeirão Preto","Rifaina","Rincão","Rinópolis","Rio Claro","Rio das Pedras","Rio Grande da Serra","Riolândia","Riversul","Rosana","Roseira","Rubiácea","Rubinéia","Sabino","Sagres","Sales","Sales Oliveira","Salesópolis","Salmourão","Saltinho","Salto","Salto de Pirapora","Salto Grande","Sandovalina","Santa Adélia","Santa Albertina","Santa Bárbara d'Oeste","Santa Branca","Santa Clara d'Oeste","Santa Cruz da Conceição","Santa Cruz da Esperança","Santa Cruz das Palmeiras","Santa Ernestina","Santa Fé do Sul","Santa Gertrudes","Santa Isabel","Santa Lúcia","Santa Maria da Serra","Santa Mercedes","Santa Rita d'Oeste","Santa Rita do Passa Quatro","Santa Rosa de Viterbo","Santa Salete","Santana da Ponte Pensa","Santana de Parnaíba","Santo Anastácio","Santo André","Santo Antônio da Alegria","Santo Antônio de Posse","Santo Antônio do Aracanguá","Santo Antônio do Jardim","Santo Antônio do Pinhal","Santópolis do Aguapeí","Santos","São Bento do Sapucaí","São Bernardo do Campo","São Caetano do Sul","São Carlos","São Francisco","São João da Boa Vista","São João das Duas Pontes","São João de Iracema","São João do Pau d'Alho","São Joaquim da Barra","São José da Bela Vista","São José do Barreiro","São José do Rio Pardo","São José do Rio Preto","São José dos Campos","São Lourenço da Serra","São Luís do Paraitinga","São Manuel","São Martinho","São Miguel Arcanjo","São Paulo","São Pedro","São Roque","São Sebastião","São Sebastião da Grama","São Simão","São Vicente","Sarapuí","Sarutaiá","Sebastianópolis do Sul","Serra Azul","Serrana","Serra Negra","Sertãozinho","Sete Barras","Severínia","Silveiras","Socorro","Sorocaba","Sud Menn","Sumaré","Suzanápolis","Suzano","Tabapuã","Tabatinga","Taboão da Serra","Taciba","Taguaí","Taiaçu","Taiúva","Tambaú","Tanabi","Tapiraí","Tapiratiba","Taquaral","Taquaritinga","Taquarituba","Taquarivaí","Tarabai","Tarumã","Tatuí","Taubaté","Tejupá","Teodoro Sampaio","Terra Roxa","Tietê","Timburi","Torre de Pedra","Torrinha","Trabiju","Tremembé","Três Fronteiras","Tuiuti","Tupã","Tupi Paulista","Turiúba","Turmalina","Ubarana","Ubatuba","Ubirajara","Uchoa","União Paulista","Urânia","Uru","Urupês","Valentim Gentil","Valinhos","Valparaíso","Vargem","Vargem Grande do Sul","Vargem Grande Paulista","Várzea Paulista","Vera Cruz","Vinhedo","Viradouro","Vista Alegre do Alto","Vitoriana","Votorantim","Votuporanga","Zacarias"];
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