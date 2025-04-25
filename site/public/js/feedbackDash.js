var contador = 0;

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



new Chart(myChart, {
    type: 'bar',
    data: {
        labels: municipios.slice(0, 10),
        datasets: [{
            label: 'Quantidade de comentários',
            data: gerarDadosAleatorios(10, 0, 20),
            backgroundColor: 'rgba(255, 159, 64, 0.7)'
        }]
    },
    options: {
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
                    text: 'Quantidade de múnicipios'
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

function abrirComentarios(){


    if(contador == 0){
        button_see.style.background = "#C0E39D";
        container_comentarios.style.display = "flex";
        contador = 1;
    }else{
        button_see.style.background = "#f3f7ea";
        container_comentarios.style.display = "none";
        contador = 0;
    }
}