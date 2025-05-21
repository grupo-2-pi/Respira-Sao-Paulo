function toggleFiltroPersonalizado() {
    const lista = document.getElementById("filtroPersonalizadoLista");
    lista.classList.toggle("active");
}



// Controle de Filtros
let filtrosPersonalizados = [];

// Função para Alternar o Modal
function toggleFiltroPersonalizado() {
    const lista = document.getElementById("filtroPersonalizadoLista");
    lista.classList.toggle("active");
}

// Função para Adicionar um Filtro Personalizado
function adicionarFiltroPersonalizado(nomeFiltro) {
    const lista = document.getElementById("listaFiltrosPersonalizados");

    // Criando o Elemento do Filtro
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

// Função para Remover um Filtro Personalizado
function removerFiltro(nomeFiltro) {
    filtrosPersonalizados = filtrosPersonalizados.filter(filtro => filtro !== nomeFiltro);
    renderizarFiltros();
}

// Função para Editar um Filtro Personalizado
function editarFiltro(nomeFiltro) {
    const novoNome = prompt("Edite o nome do filtro:", nomeFiltro);
    if (novoNome && novoNome.trim() !== "") {
        const index = filtrosPersonalizados.indexOf(nomeFiltro);
        filtrosPersonalizados[index] = novoNome;
        renderizarFiltros();
    }
}

// Função para Renderizar os Filtros na Lista
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

// Teste Inicial (Remova Depois)
document.addEventListener("DOMContentLoaded", () => {
    adicionarFiltroPersonalizado("Filtro Exemplo 1");
    adicionarFiltroPersonalizado("Filtro Exemplo 2");
});



// filtrosPersonalizados.js

// Função para Carregar Filtros ao Iniciar a Página
function carregarFiltrosPersonalizados() {
    const filtros = JSON.parse(localStorage.getItem("filtrosPersonalizados")) || [];
    filtros.forEach(filtro => adicionarFiltroPersonalizado(filtro.nome));
}
// Carregando os Filtros ao Iniciar
document.addEventListener("DOMContentLoaded", () => {
    const filtros = JSON.parse(localStorage.getItem("filtrosPersonalizados")) || [];
    filtros.forEach(filtro => adicionarFiltroPersonalizado(filtro.nome));
});

