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
            labels: ['Setembro','Outubro','Novembro', 'Dezembro'],
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
                }}}
    });
    //Talvez o ideal é deixar os dados aleatórios, se não vai ficar só com 2 meses
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
                    text: 'Evolução Anual de Gastos: 2023 vs. 2024 (Municipio Principal)',
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
