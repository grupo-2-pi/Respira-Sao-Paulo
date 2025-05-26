
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

// gráficos
const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('myChartB');
const ctx3 = document.getElementById('myChartC');
const ctx4 = document.getElementById("segunda-kpi");
const ctx5 = document.getElementById("m-segunda-kpi");

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
    // Para o velocimetro
    document.getElementById("segunda-kpi").innerHTML = '<canvas id="velocimetro"></canvas>';
    document.getElementById("m-segunda-kpi").innerHTML = '<canvas id="m-velocimetro"></canvas>';

    // KPI
    document.getElementById('kpi1-title').textContent = 'Variação mensal de internações respiratórias dos 2 últimos meses';
    aplicarEstiloKPI('kpi1-value', -5); // Para o valor dessa KPI, tem que fazer a seguinte conta: ((Mês1 - Mês2) / Mês2) * 100


    new Chart(document.getElementById('velocimetro'), { // Nessa KPI, não precisa de dados, só setar um valor baseado no mês atual, ex : janeiro vale 10 - fervereiro 20 e baseado no mês que estamos, coloca esse valor
        type: 'doughnut',
        data: {
            labels: ['Risco'],
            datasets: [{
                data: [30, 70],
                backgroundColor: ['orange', '#eee'],
                borderWidth: 0
            }]
        },
        options: {
            rotation: -90,
            circumference: 180,
            cutout: '75%',
            plugins: {
                title: {
                    display: true,
                    text: 'Risco de Internações - Estação Atual',
                    font: {
                        size: 15,
                        weight: 'bold'
                    },
                    padding: {
                        top: 20,
                        bottom: 20
                    }
                }
            }
        }
    });
    
    
    document.getElementById('kpi3-title').textContent = 'Taxa de mortalidade do último mês';
    document.getElementById('kpi3-value').textContent = '4%'; //tem essa informação no BD
    document.getElementById('m-kpi1-title').textContent = '% de variação nas internações por doenças respiratórias';
    aplicarEstiloKPI('m-kpi1-value', 5);// Para o valor dessa KPI, tem que fazer a seguinte conta: ((Mês1 - Mês2) / Mês2) * 100 // 

    new Chart(document.getElementById('m-velocimetro'), {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [30, 70], 
                backgroundColor: ['orange', '#eee'],
                borderWidth: 0
            }]
        },
        options: {
            rotation: -90,
            circumference: 180,
            cutout: '75%',
            plugins: {
                title: {
                    display: true,
                    text: 'Risco de Internações - Estação Atual',
                    font: {
                        size: 15,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                }
            }
        }
    });
    document.getElementById('m-kpi3-title').textContent = 'Taxa de mortalidade do último mês';
    document.getElementById('m-kpi3-value').textContent = '4%'; // tem essa informação no BD

    // Gráficos para persona da Saúde

    // Gráfico de barra - Do lado esquedo tem o número de internações, do lado direito, a qualidade do ar.
    // Baseado nos filtros, a pessoa poderá selecionar o periodo e os estados que gostaria de ver 
  new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: municipios.slice(0, 10), // Esse múnicipio vai se baseado nas regiões, e cada região vai ter seus próprios municipios
        datasets: [
            {
                label: 'Internações (quantidade)',
                data: gerarDadosAleatorios(10, 100, 1000), // Tem a informação de internações nos dados da saúde
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                yAxisID: 'internacoes',
                barThickness: 20
            },
            {
                label: 'Poluição (µg/m³)',
                data: gerarDadosAleatorios(10, 50, 200), // Tem a qualidade de gás poluentes nos dados do ar, n sei se somamos a quantidade de todos os gases ou não
                type: 'line',
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'poluicao'
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Internações Respiratórias X Poluição do Ar ℹ️',
                font: { size: 18 }
            }
        },
        onClick: () => alert('Este gráfico mostra a relação entre internações respiratórias com a qualidade do ar.'),
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
                grid: { drawOnChartArea: false } // remove linhas duplicadas
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
                    data: gerarDadosAleatorios(12, 10, 20), // tem os dados dos gastos no BD de saúde(mas não de ano atual)
                    borderColor: 'rgba(54, 162, 235, 1)'
                },
                {
                    label: 'Gastos 2024',
                    data: gerarDadosAleatorios(12, 10, 20),
                    borderColor: 'rgba(255, 99, 132, 1)'
                },
                {
                label: 'Média dos Gastos',
                data: [15,15,15,15,15,15,15,15,15,15,15,15,15], // Fazer a média para colocar aqui
                borderColor: 'rgba(75, 192, 192, 1)',
                borderDash: [5, 5],
                fill: false
            }
            ]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolução Anual de Gastos: 2023 vs. 2024 ℹ️',
                    font: {
                        size: 18
                    }
                }
            }, 
            onClick: () => alert('Este gráfico mostra os gastos mensais em dois anos e uma linha média para comparação.'),
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
    document.getElementById('kpi1-title').textContent = 'Municipio com maior nível de poluição';
    document.getElementById('kpi1-value').textContent = 'Guarulhos'; // Com o maior podemos somar a quantidade de poluente no ar?
    document.getElementById('kpi2-title').textContent = 'Variação da qualidade do ar dos 2 últimos meses';
    aplicarEstiloKPI('kpi2-value', -5);// Mesma conta pensada lá de cima
    document.getElementById('kpi3-title').textContent = 'Ranking de gás poluente';
    document.getElementById('kpi3-value').textContent = 'CO2';// Colocar o gás que está em mais quantidade no BD de qualidade do ar
    document.getElementById('m-kpi1-title').textContent = 'Municipio maior nível de poluição';
    document.getElementById('m-kpi1-value').textContent = 'Guarulhos';
    document.getElementById('m-kpi2-title').textContent = 'Variação da qualidade do ar dos 2 últimos meses';
    aplicarEstiloKPI('m-kpi2-value', -5);
    document.getElementById('m-kpi3-title').textContent = 'Ranking de gás poluente'
    document.getElementById('m-kpi3-value').textContent = 'CO2';

    // Gráficos para persona Ambiental
    const ctx = document.getElementById('myChart');
 new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['São Paulo', 'Guarulhos', 'São Bernardo', 'Santo André', 'Osasco',// Aqui vai ser parecido com o municipio slice, pegando a região do filtro
                 'Mauá', 'Diadema', 'Carapicuíba', 'Barueri', 'Itaquaquecetuba'],
        datasets: [
            {
                label: 'Carro',
                data: gerarDadosAleatorios(10,50,100), // aqui terá que fazer a conta que é quantidadePoluiçãoCarro x QuantidadeDeCarro. Tem essas duas informações no BD
                backgroundColor: 'rgba(75, 192, 192, .7)'  
            },
            {
                label: 'Moto',
                data: gerarDadosAleatorios(10,50,100),
                backgroundColor: 'rgba(153, 12, 255, .7)'
            },
            {
                label: 'Caminhão',
                data: gerarDadosAleatorios(10,50,100),
                backgroundColor: 'rgba(255, 99, 132, .7)'
            },
            {
                label: 'Ônibus',
                data: gerarDadosAleatorios(10,50,100),
                backgroundColor: 'rgba(255, 26, 86, 0.7)'
            }
        ]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Emissão total de CO₂ por município e tipo de veículo'
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Municípios'
                }
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Emissão total (em milhares de gramas)'
                }
            }
        }
    }
});

    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [
                {
                    label: 'São Paulo',// os municiíos que aparecerão aqui vão ser baseadas na região do filtro
                    data: gerarDadosAleatorios(12, 50, 100), // Os dados de poluição tem na qualidade do ar.
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
                },
                                {
                label: 'Média dos Gastos',
                data: gerarDadosAleatorios(12,75,75),// pegar a média igual lá em cima
                borderColor: 'rgba(75, 192, 192, 1)',
                borderDash: [5, 5],
                fill: false
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


// function atualizarDash() {

//     document.getElementById('id_fundo_escolher_filtro').style.display = "none";

//     var regiao = regiaoDesejada.value;
//     var municipioPrincipalA = municipioPrincipal.value;
//     var anoPrincipalA = anoDesejado.value;
//     var mesPrincipalA = mesDesejado.value;

//     if (municipioPrincipalA == '') {
//         municipioFeedback.innerHTML = 'São Paulo';
//     } else {
//         municipioFeedback.innerHTML = municipioPrincipalA;
//     }
//     if (anoPrincipalA == '') {
//         anoFeedback.innerHTML = '2024';
//     } else {
//         anoFeedback.innerHTML = anoPrincipalA;
//     }
//     if (mesPrincipalA == '') {
//         mesFeedback.innerHTML = 'Janeiro';
//     } else {
//         mesFeedback.innerHTML = mesPrincipalA;
//     }

//     atualizarCharts(regiao, anoPrincipalA);

// }


// /*DADOS GRÁFICOS*/

// const dadosQtdVeiculosSul = {
//     "São Paulo": 9000000,
//     "Guarulhos": 1200000,
//     "São Bernardo do Campo": 800000,
//     "Santo André": 700000,
//     "Osasco": 600000,
//     "Mauá": 400000,
//     "Diadema": 350000,
//     "Carapicuíba": 300000,
//     "Barueri": 221033,
//     "Itaquaquecetuba": 158305
// }

// const emissaoVeicular = {
//     "Moto": 273,
//     "Caminhão": 1023,
//     "Ônibus": 843,
//     "Carro": 467
// }



    // function atualizarCharts(regiao, anoPrincipalA) {

    //     if (regiao == "Sul") {
    
    //         var municipios = Object.keys(dadosQtdVeiculosSul);
    //         var valores = Object.values(dadosQtdVeiculosSul);
    //         toPuto.data.datasets[0].data[0] = valores[0];
    //         toPuto.data.datasets[0].data[1] = valores[1];
    //         toPuto.data.datasets[0].data[2] = valores[2];
    //         toPuto.data.datasets[0].data[3] = valores[3];
    //         toPuto.data.datasets[0].data[4] = valores[4];
    //         toPuto.data.datasets[0].data[5] = valores[5];
    //         toPuto.data.datasets[0].data[6] = valores[6];
    //         toPuto.data.datasets[0].data[7] = valores[7];
    //         toPuto.data.datasets[0].data[8] = valores[8];
    //         toPuto.data.datasets[0].data[9] = valores[9];
    
    //         toPuto.data.datasets[0].labels = municipios;
    //         toPuto.update();
    
    //     }
    
    //     if (anoPrincipalA == '2023') {
    
    
    //         var valores = Object.values(emissaoVeicular);
    
    //         ctxx.data.datasets[0].data[0] = valores[3];
    //         ctxx.data.datasets[0].data[1] = valores[0];
    //         ctxx.data.datasets[0].data[2] = valores[1];
    //         ctxx.data.datasets[0].data[3] = valores[2];


    //         ctxx.update();
    //     }
    
    // }