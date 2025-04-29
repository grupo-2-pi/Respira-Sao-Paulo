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




function switchPersona(persona) {
    localStorage.setItem('personaSelecionada', persona);
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
                    label: 'Internações respiratórias',
                    data: gerarDadosAleatorios(10, 100, 1000),
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    yAxisID: 'y'
                },
                {
                    label: 'Índice de poluição do ar',
                    data: gerarDadosAleatorios(10, 50, 200),
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '(Mês) de (Ano)',
                    font: {
                        size: 18
                    }
                }},
            scales: {
                y1: {
                    beginAtZero: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false // evita linhas cruzadas
                    }
                }
            }
        }
    });
    
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i + 1} semanas atrás`).reverse(),
            datasets: [
                {
                    label: 'Internações por semana',
                    data: gerarDadosAleatorios(24, 50, 200),
                    borderColor: 'rgba(54, 162, 235, 1)'
                },
                {
                    label: 'Alerta (10% acima)',
                    data: Array(24).fill(100),
                    borderColor: 'rgba(255, 206, 86, 1)'
                },
                {
                    label: 'Alerta crítico (20% acima)',
                    data: Array(24).fill(140),
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
                    text: '(Municipio Principal)',
                    font: {
                        size: 18
                    }
                }}}
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
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
                    text: '(Municipio Principal)',
                    font: {
                        size: 18
                    }}},
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
        } });

} else {

    // KPIS AMBIENTAL
    document.getElementById('kpi1-title').textContent = 'região com maior nível de poluição*';
    document.getElementById('kpi1-value').textContent = 'Guarulhos';
    document.getElementById('kpi2-title').textContent = 'região com maior quantidade de transporte*';
    document.getElementById('kpi2-value').textContent = 'São Paulo';
    document.getElementById('kpi3-title').textContent = 'Ranking de gás poluente*';
    document.getElementById('kpi3-value').textContent = 'CO2';
    document.getElementById('m-kpi1-title').textContent = 'regiões maior nível de poluição*';
    document.getElementById('m-kpi1-value').textContent = 'Guarulhos';
    document.getElementById('m-kpi2-title').textContent = 'região com maior nível de poluição*';
    document.getElementById('m-kpi2-value').textContent = 'São Paulo'
    document.getElementById('m-kpi3-title').textContent = 'Ranking de gás poluente*'
    document.getElementById('m-kpi3-value').textContent = 'CO2';

    // Gráficos para persona Ambiental
    new Chart(ctx, {
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

    new Chart(ctx3, {
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
                    text: 'Quantidade de transporte por região'
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

    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
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
                    text: 'Evolução mensal do nível de poluição por município'
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
}



// Funções do filtro (mantidas como estão)
function abrirFiltro() {
    document.getElementById('id_fundo_escolher_filtro').style.display = "flex";
}

function fecharFiltro() {
    document.getElementById('id_fundo_escolher_filtro').style.display = "none";
}