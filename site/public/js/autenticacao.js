var sideBar = document.querySelector(".side-bar");

function openSidebar() {
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
function goToAuth() {
	location.replace("/autenticacao.html");
}

function goToHistory() {
	location.href = "/#historia"
}

function goToCrenca() {
	location.href = "/#crenca"
}

function goToFeedback() {
	location.href = "/#feedback"
}

async function login() {

	const credentials = receberDadosLogin(); // json com os valores 

	if (credentials.email.trim() == "" || credentials.password.trim() == "") {
		return false;
	}

	try {

		const resposta = await fetch("/login/buscar", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				emailServer: credentials.email,
				senhaServer: credentials.password
			})
		});

		if (resposta.status == 403) {
			alert("Usuário e/ou senha inválido(s)");
		}

		if (resposta.ok) {
			const json = await resposta.json();

			sessionStorage.ID_ADMIN = json.idAdmin;
			sessionStorage.NOME_RESPIRA_SP = json.nome;
			sessionStorage.EMAIL_RESPIRA_SP = json.email;

			sessionStorage.ID_FUNCIONARIO = json.idFuncionario
			sessionStorage.CPF_FUNCIONARIO = json.cpfFuncionario;
			sessionStorage.NOME_FUNCIONARIO = json.nomeFuncionario;
			sessionStorage.EMAIL_FUNCIONARIO = json.emailFuncionario;
			sessionStorage.CARGO_FUNCIONARIO = json.cargoFuncionario;
			sessionStorage.IS_GERENTE = json.isGerente;
			sessionStorage.ID_EMPRESA = json.idEmpresa;
			sessionStorage.IS_FIRST_LOGIN = json.isFirstLogin;
			sessionStorage.PERSONA = json.persona;

			const emailResp = json.email || json.emailFuncionario;

			if (emailResp && emailResp.includes('respira.sp')) {
				sessionStorage.setItem('IS_RESPIRASP', 'true');
			} else {
				sessionStorage.setItem('IS_RESPIRASP', 'false');
			}


			if (sessionStorage.IS_FIRST_LOGIN == 1) {
				window.location = "trocarSenha.html";
			} else {
				window.location = "paginaPrincipal.html"
			}

		}


	} catch (erro) {
		console.error("Erro na requisição:", erro);
	}


}

// Recebe os dados das inputs e retorna um json pra vacilitar
function receberDadosLogin() {
	return {
		email: inputEmail.value,
		password: inputLoginPassword.value,
	};
}

function validateLoginCredentials(dados) {
	/*   var caracteresEspeciais = ["@", "#", "!", "&", "*", "$", "%"]; */
	clearErrorSpans();

	var getAFalse = false;

	const staticLogin = {
		cnpj: "12345678912345",
		password: "respiraSp"
	};

	var lowerCasePassword = dados.password.toLowerCase();
	var cnpjLength = dados.cnpj.length;
	var cnpjNumber = Number(dados.cnpj)

	// Valida se o cnpj tem alguma letra (se tiver a conversão pra numero vai retornar nan)
	if (
		cnpjNumber === NaN ||
		cnpjLength !== 14
	) {
		cnpjErrorSpan.innerHTML = "Cnpj inválido.";

		getAFalse = true;
	}

	if (
		dados.password === "" ||
		/* !caracteresEspeciais.includes(dados.password) || */
		lowerCasePassword === dados.password
	) {
		passwordErrorSpan.innerHTML = "Senha inválida.";

		getAFalse = true;
	}

	if (dados.cnpj !== staticLogin.cnpj || dados.password !== staticLogin.password) {
		getAFalse = true;
	}

	return !getAFalse;
}

function clearErrorSpans() {
	cnpjErrorSpan.innerHTML = "";
	passwordErrorSpan.innerHTML = "";
}
