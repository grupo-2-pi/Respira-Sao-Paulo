export async function login() {
	var credentials = receberDadosLogin();

	var isLoginValid = validateLoginCredentials(credentials);

	if (isLoginValid) {
		passwordErrorSpan.innerHTML = "";

		try {
			const response = await fetch("/admin/login", {
				method: "POST",
				body: JSON.stringify({
					email: credentials.email,
					password: credentials.password
				}),
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (response.ok) {
				sessionStorage.ID_ADMIN = "ADMIN";

				sessionStorage.ID_FUNCIONARIO = "ADMIN";

				location.replace("/cadastroEmpresa.html");
			}

			const json = await response.json();

			console.log(json);

			passwordErrorSpan.innerHTML = json.message;

		} catch (e) {
			console.log(e);
		}

	} else {
		console.log("Invalido")
	}
}

// Recebe os dados das inputs e retorna um json pra vacilitar
function receberDadosLogin() {
	return {
		email: inputEmail.value,
		password: inputSenha.value,
	};
}

function validateLoginCredentials(dados) {
	/*   var caracteresEspeciais = ["@", "#", "!", "&", "*", "$", "%"]; */
	clearErrorSpans();

	var getAFalse = false;
	var email = dados.email;
	var senha = dados.password;

	// Valida se o cnpj tem alguma letra (se tiver a conversão pra numero vai retornar nan)
	if (
		!email.includes("@") ||
		email.length === 0
	) {
		emailErrorSpan.innerHTML = "Email inválido.";

		getAFalse = true;
	}

	if (
		senha.length === 0
	) {
		passwordErrorSpan.innerHTML = "Senha inválida.";

		getAFalse = true;
	}

	return !getAFalse;
}

function clearErrorSpans() {
	emailErrorSpan.innerHTML = "";
	passwordErrorSpan.innerHTML = "";
}

window.login = login;
