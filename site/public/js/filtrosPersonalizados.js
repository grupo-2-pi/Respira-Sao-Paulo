
window.salvarDash = salvarDash
window.toggleFiltroPersonalizado = toggleFiltroPersonalizado;
window.editarFiltro = editarFiltro;
window.abrirEditarFiltro = abrirEditarFiltro;
window.fecharFiltroEditar = fecharFiltroEditar;
window.excluirFiltro = excluirFiltro;


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
    const lista = document.getElementById(`listaFiltrosPersonalizados`);
    lista.innerHTML = "";

    dados = filtros;

    console.log(dados);

    if (fromServer && Array.isArray(filtros)) {
        filtros.forEach((filtro) => {
            console.log(filtro)
            const li = document.createElement("li");
            li.innerHTML = `
                <div class="filtro-item">
                    <span><strong>${filtro.nome}</strong></span>
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


export async function excluirFiltro(id) {
    try {
        const response = await fetch(`http://${envVars.appHost}:${envVars.appPort}/filtro/deletar/${id}`, {
            method: "DELETE",
        });
        
        if (response.ok) {
            alert("Filtro excluído com sucesso!");
            location.reload();
        } else {
            console.error("Erro ao excluir filtro");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}



export function fecharFiltroEditar() {
    document.getElementById("id_fundo_adicionar_filtro_feedback").style.display = "none";
}

export async function editarFiltro() {
    try {
        if (!window.filtroASerEditado) {
            console.error("Nenhum filtro selecionado para edição");
            return;
        }

        const nome = document.querySelector('input[type="text"]').value;
        const regiao = document.getElementById("regiaoDesejadaEditar").value;
        const ano = document.getElementById("anoDesejadoEditar").value;
        const mes = document.getElementById("mesDesejadoEditar").value;

        const response = await fetch(`http://${envVars.appHost}:${envVars.appPort}/filtro/atualizar/${window.filtroASerEditado.idFiltro}`, {
            method: "PUT",
            body: JSON.stringify({
                nome: nome,
                ano: ano,
                mes: mes,
                regiao: regiao,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (response.ok) {
            alert("Filtro atualizado com sucesso!");
            location.reload();
            // location.reload();
        } else {
            console.error("Erro ao atualizar:", response.statusText);
        }

    } catch (e) {
        console.error("Erro na requisição:", e);
    }
}

export async function abrirEditarFiltro(id) {
    const filtro = dados.filter((f) => f.idFiltro === id)[0];

    window.filtroASerEditado = filtro;

    document.getElementById("id_fundo_adicionar_filtro_feedback").style.display = "flex";

    console.log(filtro);

    document.querySelector('input[type="text"]').value = filtro.nome;
    document.getElementById("regiaoDesejadaEditar").value = filtro.regiao;
    document.getElementById("anoDesejadoEditar").value = filtro.ano;
    document.getElementById("mesDesejadoEditar").value = filtro.mes;
}

export async function salvarDash() {
    var regiao = document.getElementById('regiaoDesejada').value;
    var ano = document.getElementById('anoDesejado').value;
    var mes = document.getElementById('mesDesejado').value;

    if (!regiao || !ano || !mes) {
        return alert('Preencha todos os campos');
    }

    var filtro = { regiao, ano, mes };

    try {
        var res = await fetch(`http://${envVars.appHost}:${envVars.appPort}/filtro/criar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filtro)
        });

        if (!res.ok) throw new Error('Erro no servidor');

        alert('Filtro salvo!');
        location.reload();

    } catch (e) {
        console.error(e);
        alert('Erro ao salvar filtro');
    }
}
