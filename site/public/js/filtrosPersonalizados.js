function toggleFiltroPersonalizado() {
    const lista = document.getElementById("filtroPersonalizadoLista");
    lista.classList.toggle("active");
}



let filtrosPersonalizados = [];

function toggleFiltroPersonalizado() {
    const lista = document.getElementById("filtroPersonalizadoLista");
    lista.classList.toggle("active");
}

function adicionarFiltroPersonalizado(nomeFiltro) {
    const lista = document.getElementById("listaFiltrosPersonalizados");

    const novoFiltro = document.createElement("li");
    novoFiltro.innerHTML = `
        <span>${nomeFiltro}</span>
        <div class="filtro-action-buttons">
            <button class="filtro-btn-editar" onclick="editarFiltro('${nomeFiltro}')">✏️</button>
            <button class="filtro-btn-excluir" onclick="removerFiltro('${nomeFiltro}')">🗑️</button>
        </div>
    `;

    lista.appendChild(novoFiltro);
    filtrosPersonalizados.push(nomeFiltro);
}

function removerFiltro(nomeFiltro) {
    filtrosPersonalizados = filtrosPersonalizados.filter(filtro => filtro !== nomeFiltro);
    renderizarFiltros();
}

// Função para Editar um Filtro Personalizado (tenho q revisar, necessário campos serem alteraveis)
function editarFiltro(nomeFiltro) {
    const novoNome = prompt("Edite o nome do filtro:", nomeFiltro);
    if (novoNome && novoNome.trim() !== "") {
        const index = filtrosPersonalizados.indexOf(nomeFiltro);
        filtrosPersonalizados[index] = novoNome;
        renderizarFiltros();
    }
}

function renderizarFiltros() {
    const lista = document.getElementById("listaFiltrosPersonalizados");
    lista.innerHTML = "";
    filtrosPersonalizados.forEach(filtro => {
        const item = document.createElement("li");
        item.innerHTML = `
            <span>${filtro}</span>
            <div class="filtro-action-buttons">
                <button class="filtro-btn-editar" onclick="editarFiltro('${filtro}')">✏️</button>
                <button class="filtro-btn-excluir" onclick="removerFiltro('${filtro}')">🗑️</button>
            </div>
        `;
        lista.appendChild(item);
    });
}

// Testando esse negocio
document.addEventListener("DOMContentLoaded", () => {
    adicionarFiltroPersonalizado("Filtro000000 1");
    adicionarFiltroPersonalizado("filtro desgracado 2");
});



function carregarFiltrosPersonalizados() {
    const filtros = JSON.parse(localStorage.getItem("filtrosPersonalizados")) || [];
    filtros.forEach(filtro => adicionarFiltroPersonalizado(filtro.nome));
}
// Carregando os Filtros ao Iniciar
document.addEventListener("DOMContentLoaded", () => {
    const filtros = JSON.parse(localStorage.getItem("filtrosPersonalizados")) || [];
    filtros.forEach(filtro => adicionarFiltroPersonalizado(filtro.nome));
});

