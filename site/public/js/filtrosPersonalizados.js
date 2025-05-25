function toggleFiltroPersonalizado() {
    const lista = document.getElementById("filtroPersonalizadoLista");
    lista.classList.toggle("active");
}


// Alterar isso depois para os filtros do banco.
let filtrosPersonalizados = [];

function toggleFiltroPersonalizado() {
    const lista = document.getElementById("filtroPersonalizadoLista");
    lista.classList.toggle("active");
}

function adicionarFiltroPersonalizado(div) {
    let lista = document.getElementById("listaFiltrosPersonalizados");
    const dados = buscarDadosNovoFiltro();

    if(div.id == "divAdicionarFeedbackEnviar"){
        lista = document.getElementById("listaFiltrosPersonalizadosFeedback");
    }

    // fazer o fetch aqui para adicionar ao backend o filtro

    const novoFiltro = document.createElement("li");
    novoFiltro.innerHTML = `
        <span>${dados.nome}</span>
        <div class="filtro-action-buttons">
            <button id="editarFiltroFeedback" class="filtro-btn-editar" onclick="editarFiltro('${dados.nome}')">✏️</button>
            <button id="removerFiltroFeedback" class="filtro-btn-excluir" onclick="removerFiltro('${dados.nome}')">🗑️</button>
        </div>
    `;

    lista.appendChild(novoFiltro);
    filtrosPersonalizados.push(dados.nome);
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

function renderizarFiltros(feedback) {
    const lista = document.getElementById("listaFiltrosPersonalizados");
    lista.innerHTML = "";
    filtrosPersonalizados.forEach(filtro => {
        const item = document.createElement("li");
        item.innerHTML = `
            <span>${filtro}</span>
            <div class="filtro-action-buttons">
                <button id="editarFiltroFeedback" class="filtro-btn-editar" onclick="editarFiltro('${filtro}')">✏️</button>
                <button id="removerFiltroFeedback" class="filtro-btn-excluir" onclick="removerFiltro('${filtro}')">🗑️</button>
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

function abrirAdicionarFiltro(button) {
    const buttonId = button.id;
    let modal = document.getElementById("id_fundo_adicionar_filtro");

    if (buttonId == "adicionarFeedback") {
        console.log(buttonId);
        modal = document.getElementById("id_fundo_adicionar_filtro_feedback");
    }

    modal.style.display = "flex";
    console.log(modal);
}

function fecharAdicionarFiltro(div) {
    const divId = div.id;

    let modal = document.getElementById("id_fundo_adicionar_filtro");

    if (divId == "divAdicionarFeedback") {
        modal = document.getElementById("id_fundo_adicionar_filtro_feedback");
    }

    modal.style.display = "none";
}

function buscarDadosNovoFiltro() {
    return {
        nome: document.getElementById("nomeNovoFiltro").value,
        municipio: document.getElementById("municipioNovoFiltro").value,
        regiao: document.getElementById("regiaoNovoFiltro").value,
        ano: document.getElementById("anoNovoFiltro").value,
        mes: document.getElementById("mesNovoFiltro").value,
    };
}

