// salvarFiltros.js

function salvarFiltroPersonalizado() {
    // Buscando os valores dos campos
    const municipio = document.getElementById("municipioPrincipal").value;
    const regiao = document.getElementById("regiaoDesejada").value;
    const ano = document.getElementById("anoDesejado").value;
    const mes = document.getElementById("mesDesejado").value;

    // Verificando se todos os campos foram preenchidos
    if (!municipio || !regiao || !ano || !mes) {
        alert("Preencha todos os campos para salvar o filtro.");
        return;
    }

    // Criando o Objeto do Filtro
    const filtro = {
        id: `filtro_${Date.now()}`,
        nome: `${municipio} - ${regiao} - ${ano} - ${mes}`,
        municipio,
        regiao,
        ano,
        mes
    };

    // Salvando no LocalStorage
    let filtros = JSON.parse(localStorage.getItem("filtrosPersonalizados")) || [];
    filtros.push(filtro);
    localStorage.setItem("filtrosPersonalizados", JSON.stringify(filtros));

    // Feedback rápido para confirmar
    alert("Filtro salvo com sucesso!");

    // Limpando os campos
    document.getElementById("municipioPrincipal").value = "";
    document.getElementById("regiaoDesejada").value = "";
    document.getElementById("anoDesejado").value = "";
    document.getElementById("mesDesejado").value = "";
}
