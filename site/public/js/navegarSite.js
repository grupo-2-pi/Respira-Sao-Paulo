function goToComentarios() {
	

if(sessionStorage.ID_EMPRESA != 1){
window.location = 'feedbackDash.html';
}else{
	alert('Somente usuários da área ambiental podem acessar os comentários.')
}

}

function goToPaginaInicial() {
	window.location = 'paginaPrincipal.html'

}

function goToCadastrar() {
	console.log("Valor no sessionStorage:", sessionStorage.getItem("IS_RESPIRASP"));

	const isRespira = sessionStorage.getItem("IS_RESPIRASP") === "true";

	if (isRespira) {
		location.replace("/cadastroEmpresa.html");
	} else {
		if (sessionStorage.IS_GERENTE === "1") {
			location.replace("/cadastroPersona.html");
		} else {
			alert('Somente usuários com cadastro de GERENTE podem fazer cadastro.');
		}
	}
}

function goToPerfil() {
	window.location = 'personal.html';
}

function goToPersonal() {
	window.location = 'personal.html';
}

function goToSair() {
	window.location = 'index.html';
}

function goToFiltros() {
	window.location = "filtros.html";
}
