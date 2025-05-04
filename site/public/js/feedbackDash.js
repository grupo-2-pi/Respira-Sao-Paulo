var contador = 0;
var listaResultado = gerarDadosAleatorios(10, 0, 20);
var mobileKPIs = document.querySelectorAll('.primeira-divisao-kpi h1');
mobileKPIs[0].innerText = 'Índice de Satisfação Ambiental';
mobileKPIs[1].innerText = 'Velocimetro';
mobileKPIs[2].innerText = 'Causa dominante ';
mobileKPIs[3].innerText = 'Indústrias';
mobileKPIs[4].innerText = 'Total de Comentários por Município (Últimos 30 Dias)*';
mobileKPIs[5].innerText = 'São Paulo - 10 comentários';

// Altera os valores das KPIs da versão DESKTOP
var desktopKPIs = document.querySelectorAll('.primeira-divisao-kpi2 h1');
desktopKPIs[0].innerText = 'Índice de Satisfação Ambiental';
desktopKPIs[1].innerText = '(Velocimetro)';
desktopKPIs[2].innerText = 'Causa dominante ';
desktopKPIs[3].innerText = 'Indústrias';
desktopKPIs[4].innerText = 'Total de Comentários (Últimos 30 Dias)*';
desktopKPIs[5].innerText = 'São Paulo - 10 comentários';


const regiaoSul = {
    "São Paulo": 500,
    "Guarulhos": 300,
    "Bernardo": 225,
    "Santo Andre": 200,
    "Osasco": 45,
    "Mauá": 15,
    "Diadema": 33,
    "Carapicuíba": 10,
    "Barueri": 112,
    "Itaquaquecetuba": 10
}

const regiaoLeste = {
    "Campinas": 200,
    "Piracicaba": 100,
    "Limeira": 75
}



const myChart = document.getElementById('myChartXX');


const myChartXX = new Chart(myChart, {
    type: 'bar',
    data: {
        labels: municipios.slice(0, 10),
        datasets: [{
            label: 'Quantidade de comentários',
            data: listaResultado,
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

function abrirComentarios() {


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

function atualizarDash() {

    document.getElementById('id_fundo_escolher_filtro').style.display = "none";
    lista = gerarDadosAleatorios2(10, 0, 20);

    var regiao = regiaoDesejada.value;
    var municipioPrincipalA = municipioPrincipal.value;
    var anoPrincipalA = anoDesejado.value;
    var mesPrincipalA = mesDesejado.value;

    if(municipioPrincipalA == ''){
        municipioFeedback.innerHTML = 'São Paulo';
    }else{
        municipioFeedback.innerHTML = municipioPrincipalA;
    }
    if(anoPrincipalA == ''){
        anoFeedback.innerHTML = '2024';
    }else{
        anoFeedback.innerHTML = anoPrincipalA;
    }
    if(mesPrincipalA == ''){
        mesFeedback.innerHTML = 'Janeiro';
    }else{
        mesFeedback.innerHTML = mesPrincipalA;
    }

    mudarChartJs(regiao);

}

function mudarChartJs(regiao) {

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
}