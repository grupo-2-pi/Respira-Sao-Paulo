
window.toggleFiltroPersonalizado = toggleFiltroPersonalizado;
window.editarFiltro = editarFiltro;
window.abrirEditarFiltro = abrirEditarFiltro;

let contextoPagina = "";
let idFixoGlobal = null;
let dados = null;


import { envVars } from './index.js';

export function toggleFiltroPersonalizado() {
    const lista = document.getElementById("filtroPersonalizadoLista");
    lista.classList.toggle("active");
}

export async function carregarFiltros(idFixo, contexto, data) {
    contextoPagina = contexto;
    idFixoGlobal = idFixo;

    adicionarFiltroPersonalizado(true, data.filtros);
}


function adicionarFiltroPersonalizado(fromServer, filtros) {
    const lista = document.getElementById(`listaFiltrosPersonalizados${capitalize(contextoPagina)}`);
    lista.innerHTML = "";

    dados = filtros;

    console.log(dados);

    if (fromServer && Array.isArray(filtros)) {
        filtros.forEach((filtro) => {
            console.log(filtro)
            const li = document.createElement("li");
            li.innerHTML = `
                <div class="filtro-item">
                    <span><strong>${filtro.nome} CU</strong></span>
                    <button onclick="abrirEditarFiltro(${filtro.idFiltro})">Editar</button>
                    <button onclick="excluirFiltro(${filtro.idFiltro})">Excluir</button>
                </div>
            `;
            lista.appendChild(li);
        });
    }
}

export function abrirAdicionarFiltro() {
    const idModal = `id_fundo_adicionar_filtro_${contextoPagina}`;
    document.getElementById(idModal).style.display = "flex";
    limparCamposFiltro();
}

export function fecharAdicionarFiltro() {
    const idModal = `id_fundo_adicionar_filtro_${contextoPagina}`;
    document.getElementById(idModal).style.display = "none";
    limparCamposFiltro();
}

function limparCamposFiltro() {
    document.getElementById("nomeNovoFiltro").value = "";
    document.getElementById("municipioNovoFiltro").value = "";
    document.getElementById("regiaoNovoFiltro").value = "";
    document.getElementById("anoNovoFiltro").value = "";
    document.getElementById("mesNovoFiltro").value = "";
}

export async function adicionarFiltroPersonalizadoEnviar() {
    const filtro = {
        nome: document.getElementById("nomeNovoFiltro").value,
        municipio: document.getElementById("municipioNovoFiltro").value,
        regiao: document.getElementById("regiaoNovoFiltro").value,
        ano: document.getElementById("anoNovoFiltro").value,
        mes: document.getElementById("mesNovoFiltro").value,
        contexto: contextoPagina
    };

    await fetch(`http://${envVars.appHost}:${envVars.appPort}/filtro/adicionar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(filtro)
    });

    fecharAdicionarFiltro();
    carregarFiltros(idFixoGlobal, contextoPagina);
}

export async function excluirFiltro(id) {
    await fetch(`http://${envVars.appHost}:${envVars.appPort}/filtro/deletar/${id}`, {
        method: "DELETE",
    });
    carregarFiltros(idFixoGlobal, contextoPagina);
}

export async function editarFiltro() {
    try {
        const nome = document.getElementById("nomeNovoFiltro");
        const municipio = document.getElementById("municipioNovoFiltro");
        const regiao = document.getElementById("regiaoNovoFiltro");
        const ano = document.getElementById("anoNovoFiltro");
        const mes = document.getElementById("mesNovoFiltro");

        const response = await fetch(`http://${envVars.appHost}:${envVars.appPort}/filtro/atualizar/${filtroASerEditado.idFiltro}`, {
            method: "PUT",
            body: JSON.stringify({
                nome,
                ano,
                mes,
                regiao,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        console.log(response);

        //location.reload();
    } catch (e) {
        console.log(e);
    }

    console.log(filtroASerEditado);

    document.getElementById("nomeNovoFiltro").value = filtroASerEditado.nome;
    document.getElementById("municipioNovoFiltro").value = filtroASerEditado.municipio;
    document.getElementById("regiaoNovoFiltro").value = filtroASerEditado.regiao;
    document.getElementById("anoNovoFiltro").value = filtroASerEditado.ano;
    document.getElementById("mesNovoFiltro").value = filtroASerEditado.mes;
}

export async function abrirEditarFiltro(id) {
    const filtro = dados.filter((f) => f.idFiltro === id)[0];

    document.getElementById("id_fundo_adicionar_filtro_feedback").style.display = "flex";

    console.log(filtro);

    document.getElementByid("nomeEditarFiltro").value = filtro.nome;
    document.getElementByid("municipioEditarFiltro").value = filtro.municipio;
    document.getElementByid("regiaoEditarFiltro").value = filtro.regiao;
    document.getElementByid("anoEditarFiltro").value = filtro.ano;
    document.getElementByid("mesEditarFiltro").value = filtro.mes;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}