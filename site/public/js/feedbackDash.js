import { envVars } from "./index.js";


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

const myChartXX = null;

export function abrirComentarios() {


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
/* 
export function atualizarDash() {

    document.getElementById('id_fundo_escolher_filtro').style.display = "none";
    lista = gerarDadosAleatorios2(10, 0, 20);

    var regiao = regiaoDesejada.value;
    var municipioPrincipalA = municipioPrincipal.value;
    var anoPrincipalA = anoDesejado.value;
    var mesPrincipalA = mesDesejado.value;

    if (municipioPrincipalA == '') {
        municipioFeedback.innerHTML = 'São Paulo';
    } else {
        municipioFeedback.innerHTML = municipioPrincipalA;
    }
    if (anoPrincipalA == '') {
        anoFeedback.innerHTML = '2024';
    } else {
        anoFeedback.innerHTML = anoPrincipalA;
    }
    if (mesPrincipalA == '') {
        mesFeedback.innerHTML = 'Janeiro';
    } else {
        mesFeedback.innerHTML = mesPrincipalA;
    }

    mudarChartJs(regiao);

}

export function mudarChartJs(regiao) {

    if (regiao == 'Sul') {

        var municipios = Object.keys(regiaoSul);
        var valores = Object.values(regiaoSul);

        myChartXX.data.datasets[0].data[0] = valores[0];
        myChartXX.data.datasets[0].data[1] = valores[1];
        myChartXX.data.datasets[0].data[2] = valores[2];
        myChartXX.data.datasets[0].data[3] = valores[3];
        myChartXX.data.datasets[0].data[4] = valores[4];
        myChartXX.data.datasets[0].data[5] = valores[5];
        myChartXX.data.datasets[0].data[6] = valores[6];
        myChartXX.data.datasets[0].data[7] = valores[7];
        myChartXX.data.datasets[0].data[8] = valores[8];
        myChartXX.data.datasets[0].data[9] = valores[9];

        myChartXX.data.datasets[0].labels = municipios;
        myChartXX.update();
        return;

    }

    myChartXX.update();
} */

export async function buscarDados() {
    try {
        // Buscar filtros antes quando estiver implementado

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

document.addEventListener('DOMContentLoaded', buscarDados);