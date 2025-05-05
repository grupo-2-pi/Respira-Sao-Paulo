function gerarDadosAleatorios(quantidade, min, max) {
    var resultado = [];

    for (var i = 0; i < quantidade; i++) {
        var numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
        resultado.push(numeroAleatorio);
    }

    return resultado;
}

function gerarDadosAleatorios2(quantidade, min, max) {
    var resultado = [];

    for (var i = 0; i < quantidade; i++) {
        var numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
        resultado.push(numeroAleatorio);
    }

    return resultado;
}




function switchPersona(select) {
    const value = select.value;

    localStorage.setItem('personaSelecionada', value);
    location.reload(); // Recarrega a página para aplicar a nova persona
}


const persona = localStorage.getItem('personaSelecionada');

// gráficos
const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('myChartB');
const ctx3 = document.getElementById('myChartC');

const municipios = ['São Paulo', 'Guarulhos', 'São Bernardo', 'Santo André', 'Osasco',
    'Mauá', 'Diadema', 'Carapicuíba', 'Barueri', 'Itaquaquecetuba'];

function aplicarEstiloKPI(id, valorTexto) {
    var elemento = document.getElementById(id);
    var valorNumerico = parseFloat(valorTexto); // ignora o %

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

    // KPI
    document.getElementById('kpi1-title').textContent = 'Variação mensal de internações respiratórias dos 2 últimos meses';
    aplicarEstiloKPI('kpi1-value', -5);
    document.getElementById('kpi2-title').textContent = 'Tendência do perigo da estação atual';
    document.getElementById('kpi2-value').textContent = '(velocimetro)';
    document.getElementById('kpi3-title').textContent = 'Taxa de mortalidade do último mês';
    document.getElementById('kpi3-value').textContent = '4%';
    document.getElementById('m-kpi1-title').textContent = '% de variação nas internações por doenças respiratórias*';
    aplicarEstiloKPI('m-kpi1-value', 5);
    document.getElementById('m-kpi2-title').textContent = 'Tendência da estação';
    document.getElementById('m-kpi2-value').textContent = '(velocimetro)';
    document.getElementById('m-kpi3-title').textContent = 'Taxa de mortalidade do último mês';
    document.getElementById('m-kpi3-value').textContent = '4%';

    // Gráficos para persona da Saúde

    // Gráfico de barra - Do lado esquedo tem o número de internações, do lado direito, a qualidade do ar.
    // Baseado nos filtros, a pessoa poderá selecionar o periodo e os estados que gostaria de ver 
    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: municipios.slice(0, 10),
            datasets: [
                {
                    label: 'Internações (quantidade)',
                    data: gerarDadosAleatorios(10, 100, 1000),
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    xAxisID: 'internacoes'
                },
                {
                    label: 'Poluição (µg/m³)',
                    data: gerarDadosAleatorios(10, 50, 200),
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    xAxisID: 'poluicao'
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Internações Respiratórias X Poluição do Ar - (Mês) de (Ano)',
                    font: {
                        size: 18
                    }
                }
            },
            scales: {
                internacoes: {
                    position: 'bottom',
                    title: { display: true, text: 'Internações' }
                },
                poluicao: {
                    position: 'top',
                    title: { display: true, text: 'Poluição' }
                }
            }
        }
    });

    //Talvez o ideal é deixar os dados aleatórios, se não vai ficar só com 2 meses
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [
                {
                    label: 'Internações últimos 4 meses',
                    data: gerarDadosAleatorios(4, 50, 200),
                    borderColor: 'rgba(54, 162, 235, 1)'
                },
                {
                    label: 'Média do último ano',
                    data: Array(4).fill(100),
                    borderColor: 'rgba(255, 206, 86, 1)'
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Variação Mensal de Internações vs. Média Anual - (Municipio Principal)',
                    font: {
                        size: 18
                    }
                }
            }
        }
    });
    //Talvez o ideal é deixar os dados aleatórios, se não vai ficar só com 2 meses
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [
                {
                    label: 'Gastos 2023',
                    data: gerarDadosAleatorios(12, 10, 20),
                    borderColor: 'rgba(54, 162, 235, 1)'
                },
                {
                    label: 'Gastos 2024',
                    data: gerarDadosAleatorios(12, 10, 20),
                    borderColor: 'rgba(255, 99, 132, 1)'
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolução Anual de Gastos: 2023 vs. 2024 (Municipio Principal)',
                    font: {
                        size: 18
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'R$ em milhões'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Meses'
                    }
                }
            }
        }
    });

} else {
    // KPIS AMBIENTAL
    document.getElementById('kpi1-title').textContent = 'Região com maior nível de poluição*';
    document.getElementById('kpi1-value').textContent = 'Guarulhos';
    document.getElementById('kpi2-title').textContent = 'Região com maior quantidade de transporte*';
    document.getElementById('kpi2-value').textContent = 'São Paulo';
    document.getElementById('kpi3-title').textContent = 'Ranking de gás poluente*';
    document.getElementById('kpi3-value').textContent = 'CO2';
    document.getElementById('m-kpi1-title').textContent = 'Regiões maior nível de poluição*';
    document.getElementById('m-kpi1-value').textContent = 'Guarulhos';
    document.getElementById('m-kpi2-title').textContent = 'Região com maior nível de poluição*';
    document.getElementById('m-kpi2-value').textContent = 'São Paulo'
    document.getElementById('m-kpi3-title').textContent = 'Ranking de gás poluente*'
    document.getElementById('m-kpi3-value').textContent = 'CO2';

    // Gráficos para persona Ambiental
    const ctx = document.getElementById('myChart');
    const ctxx = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Carro', 'Moto', 'Caminhão', 'Ônibus'],
            datasets: [{
                label: 'Emissão média de CO₂',
                data: gerarDadosAleatorios(4, 100, 300),
                backgroundColor: 'rgba(75, 192, 192, 0.7)'
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Emissão de CO₂ por Tipo de Veículo',
                    font: {
                        size: 14
                    }
                }
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: '(g/km)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Automóveis'
                    }
                }
            }
        }
    });
    const ctx3 = document.getElementById('myChartC');
    const toPuto = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: municipios.slice(0, 10),
            datasets: [{
                label: 'Quantidade de veículos',
                data: gerarDadosAleatorios(10, 10000, 30000),
                backgroundColor: 'rgba(255, 159, 64, 0.7)'
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Quantidade de transporte por região',
                    font: {
                        size: 14
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Quantidade de veículos'
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

    //Talvez o ideal é deixar os dados aleatórios, já que temos só 2 meses
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [
                {
                    label: 'São Paulo',
                    data: gerarDadosAleatorios(12, 50, 100),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)'
                },
                {
                    label: 'Guarulhos',
                    data: gerarDadosAleatorios(12, 50, 100),
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)'
                },
                {
                    label: 'São Bernardo',
                    data: gerarDadosAleatorios(12, 50, 100),
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)'
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolução mensal do nível de poluição por município',
                    font: {
                        size: 14
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Índice de poluição'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Mês'
                    }
                }
            }
        }
    });

    function atualizarCharts(regiao, anoPrincipalA) {

        if (regiao == "Sul") {
    
            var municipios = Object.keys(dadosQtdVeiculosSul);
            var valores = Object.values(dadosQtdVeiculosSul);
            toPuto.data.datasets[0].data[0] = valores[0];
            toPuto.data.datasets[0].data[1] = valores[1];
            toPuto.data.datasets[0].data[2] = valores[2];
            toPuto.data.datasets[0].data[3] = valores[3];
            toPuto.data.datasets[0].data[4] = valores[4];
            toPuto.data.datasets[0].data[5] = valores[5];
            toPuto.data.datasets[0].data[6] = valores[6];
            toPuto.data.datasets[0].data[7] = valores[7];
            toPuto.data.datasets[0].data[8] = valores[8];
            toPuto.data.datasets[0].data[9] = valores[9];
    
            toPuto.data.datasets[0].labels = municipios;
            toPuto.update();
    
        }
    
        if (anoPrincipalA == '2023') {
    
    
            var valores = Object.values(emissaoVeicular);
    
            ctxx.data.datasets[0].data[0] = valores[3];
            ctxx.data.datasets[0].data[1] = valores[0];
            ctxx.data.datasets[0].data[2] = valores[1];
            ctxx.data.datasets[0].data[3] = valores[2];


            ctxx.update();
        }
    
    }

}



// Funções do filtro (mantidas como estão)
function abrirFiltro() {
    document.getElementById('id_fundo_escolher_filtro').style.display = "flex";
}

function fecharFiltro() {
    document.getElementById('id_fundo_escolher_filtro').style.display = "none";
}


function atualizarDash() {

    document.getElementById('id_fundo_escolher_filtro').style.display = "none";

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

    atualizarCharts(regiao, anoPrincipalA);

}


/*DADOS GRÁFICOS*/

const dadosQtdVeiculosSul = {
    "São Paulo": 9000000,
    "Guarulhos": 1200000,
    "São Bernardo do Campo": 800000,
    "Santo André": 700000,
    "Osasco": 600000,
    "Mauá": 400000,
    "Diadema": 350000,
    "Carapicuíba": 300000,
    "Barueri": 221033,
    "Itaquaquecetuba": 158305
}

const emissaoVeicular = {
    "Moto": 273,
    "Caminhão": 1023,
    "Ônibus": 843,
    "Carro": 467
}



