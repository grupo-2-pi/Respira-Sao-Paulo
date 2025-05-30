// Para mockar dados aleatórios
function gerarDadosAleatorios(quantidade, min, max) {
    var resultado = [];
    for (var i = 0; i < quantidade; i++) {
        var numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
        resultado.push(numeroAleatorio);
    }
    return resultado;
}

function switchPersona(persona) {
    localStorage.setItem('personaSelecionada', persona);
    location.reload(); // Recarrega a página para aplicar a nova persona
}

const persona = localStorage.getItem('personaSelecionada');

const ctx = document.getElementById('myChart').getContext('2d');
const ctx2 = document.getElementById('myChartB').getContext('2d');
const ctx3 = document.getElementById('myChartC');
const ctx4 = document.getElementById("segunda-kpi");
const ctx5 = document.getElementById("m-segunda-kpi");

const municipios = ['São Paulo', 'Guarulhos', 'São Bernardo', 'Santo André', 'Osasco',
    'Mauá', 'Diadema', 'Carapicuíba', 'Barueri', 'Itaquaquecetuba'];

let myChart;
let myChartB;

function aplicarEstiloKPI(id, valorTexto) {
    var elemento = document.getElementById(id);
    var valorNumerico = parseFloat(valorTexto);
    if (valorNumerico > 0) {
        elemento.textContent = valorNumerico + '% ▲';
        elemento.style.color = 'red';
    } else if (valorNumerico < 0) {
        elemento.textContent = Math.abs(valorNumerico) + '% ▼';
        elemento.style.color = 'green';
    } else {
        elemento.textContent = '0%';
        elemento.style.color = 'black';
    }
}

if (persona == 'saude') {
    document.getElementById("segunda-kpi").innerHTML = '<canvas id="velocimetro"></canvas>';
    document.getElementById("m-segunda-kpi").innerHTML = '<canvas id="m-velocimetro"></canvas>';

    document.getElementById('kpi1-title').textContent = 'Variação mensal de internações respiratórias dos 2 últimos meses';
    aplicarEstiloKPI('kpi1-value', -5);
    new Chart(document.getElementById('velocimetro'), {
        type: 'doughnut',
        data: { labels: ['Risco'], datasets: [{ data: [30, 70], backgroundColor: ['orange', '#eee'], borderWidth: 0 }] },
        options: { rotation: -90, circumference: 180, cutout: '75%', plugins: { title: { display: true, text: 'Risco de Internações - Estação Atual', font: { size: 15, weight: 'bold' }, padding: { top: 20, bottom: 20 } } } }
    });

    document.getElementById('kpi3-title').textContent = 'Taxa de mortalidade do último mês';
    document.getElementById('kpi3-value').textContent = '4%';
    document.getElementById('m-kpi1-title').textContent = '% de variação nas internações por doenças respiratórias';
    aplicarEstiloKPI('m-kpi1-value', 5);
    new Chart(document.getElementById('m-velocimetro'), {
        type: 'doughnut',
        data: { datasets: [{ data: [30, 70], backgroundColor: ['orange', '#eee'], borderWidth: 0 }] },
        options: { rotation: -90, circumference: 180, cutout: '75%', plugins: { title: { display: true, text: 'Risco de Internações - Estação Atual', font: { size: 15, weight: 'bold' }, padding: { top: 10, bottom: 10 } } } }
    });

    document.getElementById('m-kpi3-title').textContent = 'Taxa de mortalidade do último mês';
    document.getElementById('m-kpi3-value').textContent = '4%';

    myChartB = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: municipios.slice(0, 10),
            datasets: [
                { label: 'Internações (quantidade)', data: gerarDadosAleatorios(10, 100, 1000), backgroundColor: 'rgba(54, 162, 235, 0.7)', yAxisID: 'internacoes', barThickness: 20 },
                { label: 'Poluição (µg/m³)', data: gerarDadosAleatorios(10, 50, 200), type: 'line', borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.5)', yAxisID: 'poluicao' }
            ]
        },
        options: {
            responsive: true,
            plugins: { title: { display: true, text: 'Internações Respiratórias X Poluição do Ar ℹ️', font: { size: 18 } } },
            onClick: () => alert('Este gráfico mostra a relação entre internações respiratórias com a qualidade do ar.'),
            scales: {
                internacoes: { type: 'linear', position: 'left', title: { display: true, text: 'Internações' } },
                poluicao: { type: 'linear', position: 'right', title: { display: true, text: 'Poluição (µg/m³)' }, grid: { drawOnChartArea: false } }
            }
        }
    });

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [
                { label: 'Gastos 2023', data: gerarDadosAleatorios(12, 10, 20), borderColor: 'rgba(54, 162, 235, 1)' },
                { label: 'Gastos 2024', data: gerarDadosAleatorios(12, 10, 20), borderColor: 'rgba(255, 99, 132, 1)' },
                { label: 'Média dos Gastos', data: Array(12).fill(15), borderColor: 'rgba(75, 192, 192, 1)', borderDash: [5, 5], fill: false }
            ]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: { title: { display: true, text: 'Evolução Anual de Gastos: 2023 vs. 2024 ℹ️', font: { size: 18 } } },
            onClick: () => alert('Este gráfico mostra os gastos mensais em dois anos e uma linha média para comparação.'),
            scales: {
                y: { title: { display: true, text: 'R$ em milhões' } },
                x: { title: { display: true, text: 'Meses' } }
            }
        }
    });

} else {
    document.getElementById('kpi1-title').textContent = 'Municipio com maior nível de poluição';
    document.getElementById('kpi1-value').textContent = 'Guarulhos';
    document.getElementById('kpi2-title').textContent = 'Variação da qualidade do ar dos 2 últimos meses';
    aplicarEstiloKPI('kpi2-value', -5);
    document.getElementById('kpi3-title').textContent = 'Ranking de gás poluente';
    document.getElementById('kpi3-value').textContent = 'COasass2';
    document.getElementById('m-kpi1-title').textContent = 'Municipio maior nível de poluição';
    document.getElementById('m-kpi1-value').textContent = 'Guarulhos';
    document.getElementById('m-kpi2-title').textContent = 'Variação da qualidade do ar dos 2 últimos meses';
    aplicarEstiloKPI('m-kpi2-value', -5);
    document.getElementById('m-kpi3-title').textContent = 'Ranking de gás poluente';
    document.getElementById('m-kpi3-value').textContent = 'CO2';

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: municipios,
            datasets: [
                { label: 'Carro', data: gerarDadosAleatorios(10, 50, 100), backgroundColor: 'rgba(75, 192, 192, .7)' },
                { label: 'Moto', data: gerarDadosAleatorios(10, 50, 100), backgroundColor: 'rgba(153, 12, 255, .7)' },
                { label: 'Caminhão', data: gerarDadosAleatorios(10, 50, 100), backgroundColor: 'rgba(255, 99, 132, .7)' },
                { label: 'Ônibus', data: gerarDadosAleatorios(10, 50, 100), backgroundColor: 'rgba(255, 26, 86, 0.7)' }
            ]
        },
        options: {
            plugins: { title: { display: true, text: 'Estimativa de emissão de CO₂ por km e tipo de veículo' } },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { stacked: true, title: { display: true, text: 'Municípios' } },
                y: { stacked: true, title: { display: true, text: 'Emissão total (em milhares de gramas)' } }
            }
        }
    });

    myChartB = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [
                { label: 'São Paulo', data: gerarDadosAleatorios(12, 50, 100), borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.2)' },
                { label: 'Guarulhos', data: gerarDadosAleatorios(12, 50, 100), borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.2)' },
                { label: 'São Bernardo', data: gerarDadosAleatorios(12, 50, 100), borderColor: 'rgba(255, 206, 86, 1)', backgroundColor: 'rgba(255, 206, 86, 0.2)' },
            ]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: { title: { display: true, text: 'Evolução mensal do nível de poluição por município', font: { size: 14 } } },
            scales: {
                y: { beginAtZero: false, title: { display: true, text: 'Índice de Poluição (µg/m³)' } },
                x: { title: { display: true, text: 'Mês' } }
            }
        }
    });
}

function abrirFiltro() {
    document.getElementById('id_fundo_escolher_filtro').style.display = "flex";
}

function fecharFiltro() {
    document.getElementById('id_fundo_escolher_filtro').style.display = "none";
}


//calculos---------------------------------------------------

function calcularMesAnterior(ano, mes) {
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    let indice = meses.indexOf(mes);

    if (indice === -1) {
        console.error('Mês inválido:', mes);
        return { anoAnterior: ano, mesAnterior: mes };
    }

    if (indice === 0) {
        return { anoAnterior: String(Number(ano) - 1), mesAnterior: 'Dezembro' };
    } else {
        return { anoAnterior: ano, mesAnterior: meses[indice - 1] };
    }
}

const backendBaseURL = "http://localhost:3000";


function buscarDadosDashboard(regiao, ano, mes, callback) {
    const { anoAnterior, mesAnterior } = calcularMesAnterior(ano, mes);

    const urlAtual = `${backendBaseURL}/dashboard/dados?regiao=${encodeURIComponent(regiao)}&ano=${encodeURIComponent(ano)}&mes=${encodeURIComponent(mes)}`;
    const urlAnterior = `${backendBaseURL}/dashboard/dados?regiao=${encodeURIComponent(regiao)}&ano=${encodeURIComponent(anoAnterior)}&mes=${encodeURIComponent(mesAnterior)}`;

    const fetchAtual = fetch(urlAtual).then(res => res.json());
    const fetchAnterior = fetch(urlAnterior).then(res => res.json());

    Promise.all([fetchAtual, fetchAnterior])
        .then(([dadosAtual, dadosAnterior]) => {
            callback(dadosAtual, dadosAnterior);
        })
        .catch(err => {
            console.error("Erro ao buscar dados do dashboard:", err);
        });
}

function calcularVariacao(valorAtual, valorAnterior) {
    if (valorAnterior === 0) {
        return 0; 
    }
    return ((valorAtual - valorAnterior) / valorAnterior) * 100;
}

function calcularMediaQualidade(qualidadeAr) {
    if (!qualidadeAr || qualidadeAr.length === 0) return 0;
    const soma = qualidadeAr.reduce((acc, item) => acc + item.valor, 0);
    return soma / qualidadeAr.length;
}

function calcularMediaInternacoes(mortalidade) {
    if (!mortalidade || mortalidade.length === 0) return 0;
    const soma = mortalidade.reduce((acc, item) => acc + item.numeroInternacoes, 0);
    return soma / mortalidade.length;
}



function atualizarKPIsComVariação(dadosAtual, dadosAnterior, persona) {
    if (persona === 'ambiental') {
        const mediaAtual = calcularMediaQualidade(dadosAtual.graficos.qualidadeAr);
        const mediaAnterior = calcularMediaQualidade(dadosAnterior.graficos.qualidadeAr);
        const variacao = calcularVariacao(mediaAtual, mediaAnterior);
        const variacaoFormatada = Math.round(variacao);

        document.getElementById('kpi1-value').textContent = dadosAtual.kpis.maisPoluido;
        aplicarEstiloKPI('kpi2-value', variacaoFormatada);
        document.getElementById('kpi3-value').textContent = dadosAtual.kpis.rankingPoluente;
    }
}



//Atualzando dash aqui------------------------------------------------

async function atualizarDash() {
    fecharFiltro();

    const regiao = document.getElementById('filtroRegiao').value;
    const ano = document.getElementById('filtroAno').value;
    const mes = document.getElementById('filtroMes').value;

    const persona = localStorage.getItem('personaSelecionada');

    buscarDadosDashboard(regiao, ano, mes, (dadosAtual, dadosAnterior) => {
        atualizarCharts(dadosAtual); 
        atualizarKPIsComVariação(dadosAtual, dadosAnterior, persona);
    });
}


function atualizarCharts(data) {
    const persona = localStorage.getItem('personaSelecionada');

    if (persona === 'ambiental') {
        atualizarGraficosAmbientais(data.graficos);
    } else {
        atualizarGraficosSaude(data.graficos);
    }
}

//ambiente
function atualizarGraficosAmbientais(graficos) {
    // === Gráfico da esquerda (barras empilhadas de emissão) ===
    const municipios = graficos.frota.map(item => item.municipio);

    const fatorCO2 = {
    automoveis: 192,
    motos: 72,
    caminhoes: 800,
    onibus: 1040
};

const datasetCarro = graficos.frota.map(item => item.automoveis * fatorCO2.automoveis);
const datasetMoto = graficos.frota.map(item => item.motos * fatorCO2.motos);
const datasetCaminhao = graficos.frota.map(item => item.caminhoes * fatorCO2.caminhoes);
const datasetOnibus = graficos.frota.map(item => item.onibus * fatorCO2.onibus);


    myChart.data.labels = municipios;
    myChart.data.datasets[0].data = datasetCarro;
    myChart.data.datasets[1].data = datasetMoto;
    myChart.data.datasets[2].data = datasetCaminhao;
    myChart.data.datasets[3].data = datasetOnibus;
    myChart.update();

    // === Gráfico da direita (evolução mensal de poluição por município) ===
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const dados = graficos.qualidadeArTodosMeses;

    const dadosPorMunicipio = {};

    dados.forEach(item => {
        const municipio = item.municipio;
        const mes = item.mes;
        const valor = item.valor;

        if (!dadosPorMunicipio[municipio]) {
            dadosPorMunicipio[municipio] = {};
        }

        dadosPorMunicipio[municipio][mes] = valor;
    });

    const datasets = [];

    for (const municipio in dadosPorMunicipio) {
        const valores = meses.map(m => dadosPorMunicipio[municipio][m] || 0);

        datasets.push({
            label: municipio,
            data: valores,
            borderColor: gerarCorAleatoria(),
            backgroundColor: 'transparent',
            tension: 0,
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5
        });
    }

    myChartB.data.labels = meses;
    myChartB.data.datasets = datasets;
    myChartB.options.plugins.title.text = 'Evolução mensal do nível de poluição por município';
    myChartB.update();
}

const coresFixas = [
    '#e6194b', // Vermelho
    '#3cb44b', // Verde
    '#ffe119', // Amarelo
    '#4363d8', // Azul
    '#f58231', // Laranja
    '#911eb4', // Roxo
    '#46f0f0', // Ciano
    '#f032e6', // Rosa
    '#bcf60c', // Verde limão
    '#fabebe', // Rosa claro
    '#008080', // Verde petróleo
    '#e6beff', // Lavanda
    '#9a6324', // Marrom
    '#fffac8', // Creme
    '#800000', // Vinho
    '#aaffc3', // Verde menta
    '#808000', // Verde musgo
    '#ffd8b1', // Pêssego
    '#000075', // Azul escuro
    '#808080'  // Cinza (último mesmo)
];

let corIndex = 0;
function gerarCorAleatoria() {
    const cor = coresFixas[corIndex % coresFixas.length];
    corIndex++;
    return cor;
}




//saude
function atualizarGraficosSaude(graficos) {
    const municipios = graficos.mortalidade.map(item => item.municipio);

    const internacoes = graficos.mortalidade.map(item => item.numeroInternacoes);
    const valorTotal = graficos.mortalidade.map(item => item.valorTotal);

    myChartB.data.labels = municipios;
    myChartB.data.datasets = [
        {
            label: 'Internações (quantidade)',
            data: internacoes,
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            yAxisID: 'internacoes',
            barThickness: 20,
            type: 'bar'
        },
        {
            label: 'Poluição (µg/m³)',
            data: valorTotal,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'poluicao',
            type: 'line',
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 7
        }
    ];

    myChartB.options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Internações Respiratórias X Poluição do Ar ℹ️',
                font: { size: 18 }
            }
        },
        scales: {
            internacoes: {
                type: 'linear',
                position: 'left',
                title: { display: true, text: 'Internações' }
            },
            poluicao: {
                type: 'linear',
                position: 'right',
                title: { display: true, text: 'Poluição (µg/m³)' },
                grid: { drawOnChartArea: false }
            }
        }
    };

    myChartB.update();
}




