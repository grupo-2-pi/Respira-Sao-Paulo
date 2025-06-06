import { envVars } from "./index.js";
import { carregarFiltros } from "./filtrosPersonalizados.js";
document.addEventListener('DOMContentLoaded', buscarDados);

const regioes = [
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

const estadoUsuario = "São Paulo";
var contador = 0;

const myChart = document.getElementById('myChartXX');

let myChartXX = null;

export async function abrirComentarios() {
  try {
    const response = await fetch(`feedback/buscar/comentarios/${10}/${10}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    const { comentarios } = await response.json();

    const container = document.getElementById("divComentarios");

    if (comentarios.length === 0) {
      container.innerHTML = "Sem comentários ainda...";
    }
    
      comentarios.forEach((comentario) => {
        container.innerHTML += `
        <div class="comentario">
            <div class="cabecalho">
                        <div class="cabecalho-municipio">
                            <p>Região:</p>
                            <p>${comentario.regiao}</p>
                        </div>
                        <div class="cabecalho-poluente">
                            <p>Poluidor:</p>
                            <p>${comentario.tipoPoluicao}</p>
                        </div>
                    </div>
                    <div class="descricao">
                        <p>
                        ${comentario.descricao}
                        </p>
                    </div>
                </div>
      `
      })

    console.log(response);

  } catch (e) {
    console.logf(e);
  }

  if (contador == 0) {
    button_see.style.background = "#C0E39D";
    container_comentarios.style.display = "flex";
    contador = 1;
  } else {
    button_see.style.background = "#f3f7ea";
    container_comentarios.style.display = "none";
    contador = 0;
  }
}

export async function buscarDados() {
  try {
    // Alterar para o id do funcionario apos implementarem o login
    const idFixo = 1;

    const responseFiltros = await fetch(`http://${envVars.appHost}:${envVars.appPort}/filtro/buscar/${idFixo}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const filtrosJson = await responseFiltros.json();

    carregarFiltros(1, "feedback", filtrosJson);

    const response = await fetch(`http://${envVars.appHost}:${envVars.appPort}/feedback/buscar/${estadoUsuario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
    );

    const jsonData = await response.json();

    const { graficos } = jsonData;

    const { kpis } = jsonData;

    kpis === undefined ? "Sem dados" : kpis;

    causaDominante.innerHTML = kpis.causaDominante;
    totalComentarios.innerHTML = kpis.totalComentarios;

    causaDominanteMobile.innerHTML = kpis.causaDominante;
    totalComentariosMobile.innerHTML = kpis.totalComentarios;

    const rating = Number(kpis.notaTotal).toFixed(0);

    const starsDesktop = document.querySelectorAll('#ratingMobile .star svg');

    console.log(rating);

    starsDesktop.forEach((star, index) => {
      console.log("A");
      if (index < rating) {
        star.classList.add("filled");
        console.log(star)
      }
    });

    const dadosGrafico = graficos.responseGrafico.map((g) => {
      return g.totalComentarios
    });

    myChartXX = new Chart(myChart, {
      type: 'bar',
      data: {
        labels: regioes,
        datasets: [{
          label: 'Quantidade de comentários',
          data: dadosGrafico,
          backgroundColor: 'rgba(255, 159, 64, 0.7)'
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Quantidade de Comentários por região'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Quantidade de comentários'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Municipios'
            }
          }
        }
      }
    });

    console.log(kpis);

    console.log(jsonData);

  } catch (e) {
    console.log(e);
  }
}

window.abrirComentarios = abrirComentarios;
window.buscarDados = buscarDados;
