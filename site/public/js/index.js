var sideBar = document.querySelector(".side-bar");

window.addEventListener("load", () => {
	const eGerente = sessionStorage.getItem("IS_GERENTE") === "1";

	// if (!eGerente) {
	// 	location.replace("paginaPrincipal.html");
	// }

	const nomeUsuario = sessionStorage.getItem("NOME_FUNCIONARIO");

	spanNomeUsuario.innerHTML = nomeUsuario;


});


export function openSidebar() {
	var body = document.querySelector(".body");

	if (sideBar.classList.contains("active")) {

		sideBar.classList.remove("active");
	} else {

		sideBar.classList.add("active");

		// Adicionar o listener após um delay
		setTimeout(() => {
			document.addEventListener('click', clickOutsideHandler);
		}, 50);
	}

	console.log(sideBar);
}

var clickOutsideHandler = (event) => {
	if (!sideBar.contains(event.target)) {
		sideBar.classList.remove("active");
		// Remover o listener após fechar a siedbar
		document.removeEventListener('click', clickOutsideHandler);
	}
};

export function goToHistory() {
	var div = document.querySelector(".historia");
	div.scrollIntoView({ behavior: "smooth" });
}

export function goToCrenca() {
	var div = document.querySelector(".container");
	div.scrollIntoView({ behavior: "smooth" });
}
export function goToFeedback() {
	var div = document.querySelector(".feedback-container");
	div.scrollIntoView({ behavior: "smooth" });
}

export function goToFeedbackPage() {
	location.replace(`/feedback.html`)
}

export function goToAuth() {
	location.replace("/autenticacao.html");
}

export const envVars = {
	appHost: "localhost",
	appPort: 3000
};

window.openSidebar = openSidebar;
window.goToHistory = goToHistory;
window.goToCrenca = goToCrenca;
window.goToFeedback = goToFeedback;
window.goToFeedbackPage = goToFeedbackPage;
window.goToAuth = goToAuth;
window.envVars = envVars;
