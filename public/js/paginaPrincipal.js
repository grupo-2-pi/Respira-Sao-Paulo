const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Registro de Doenças Respiratórias por Munícipio',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});



const ctx2 = document.getElementById('myChartB');

new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Nível de Poluição por Município',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});



function showNotifications(){
    console.log("dentro");


    var dropdown = document.querySelector(".notification-dropdown");
    dropdown.style.opacity = "1";
    
    dropdown.style.visibility = "visible";
    
    dropdown.style.transform = "translateY(0)";

    dropdown.style.display = "flex";
};

function hideNotifications(){
    console.log("fora");

    var dropdown = document.querySelector(".notification-dropdown");
    dropdown.style.opacity = "0";
    dropdown.style.visibility = "hidden";

    dropdown.style.transform = "translateY(-10px)";

    dropdown.style.display = "none";
};

function showUserOptions(){
    console.log("dentro");


    var dropdown = document.querySelector(".user-dropdown-options");
    dropdown.style.opacity = "1";
    
    dropdown.style.visibility = "visible";
    
    dropdown.style.transform = "translateY(0)";

    dropdown.style.display = "flex";
}

function hideUserOptions(){
    console.log("fora");


    var dropdown = document.querySelector(".user-dropdown-options");
    dropdown.style.opacity = "0";
    
    dropdown.style.visibility = "hidden";
    
    dropdown.style.transform = "translateY(-10px)";

    dropdown.style.display = "none";
}

function abrirFiltro(){
    id_fundo_escolher_filtro.style.display = "flex";

}

function fecharFiltro(){
    id_fundo_escolher_filtro.style.display = "none";
}