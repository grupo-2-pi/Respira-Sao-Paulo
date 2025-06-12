var nomeFant = document.getElementById("nomeFantasia");
var nomeEmpresa = document.getElementById("nomeEmpresa");
var email = document.getElementById("emailEmpresa");
var cnpj = document.getElementById("numCnpj");
var tel = document.getElementById("telEmpresa");

window.addEventListener("load", () => {

	const idFuncionario = sessionStorage.ID_FUNCIONARIO;

	if (idFuncionario === undefined || idFuncionario === null) {
		location.replace("autenticacao.html");
	}
});

const dominiosPermitidos = [
	"gmail.com",
	"hotmail.com",
	"outlook.com",
	"yahoo.com",
	"sptech.school",
	"respira.sp"
];

var validacaoFantasia = false;
var validacaoNome = false;
var validacaoEmail = false;
var validacaoTel = false;
var validacaoCnpj = false;

function validarFantasia(valor) {
	const texto = valor.value.trim();
	validacaoFantasia = texto.length > 2 && texto.length <= 45;
}

function validarNome(valor) {
	const texto = valor.value.trim();
	validacaoNome = texto.length > 2 && texto.length <= 45;
}

function validarEmail(valor) {
	const texto = valor.value.trim();
	const partes = texto.split("@");

	if (partes.length === 2) {
		const dominio = partes[1];
		validacaoEmail = dominiosPermitidos.includes(dominio) && texto.length >= 10 && texto.length <= 100;
	} else {
		validacaoEmail = false;
	}
}

function validarCnpj(valor) {
	const texto = valor.value.trim();
	validacaoCnpj = texto.length === 14 && !isNaN(texto);
}

function validarTel(valor) {
	const texto = valor.value.trim();
	validacaoTel = texto.length === 11 && !isNaN(texto);
}

function cadastrarEmpresa() {
	botaoCadastrar.innerHTML = "carregando...";

	validarFantasia(nomeFant);
	validarNome(nomeEmpresa);
	validarCnpj(cnpj);
	validarTel(tel);
	validarEmail(email);

	console.log({
		validacaoFantasia,
		validacaoNome,
		validacaoCnpj,
		validacaoTel,
		validacaoEmail
	});

	if ((validacaoCnpj && validacaoEmail && validacaoTel && validacaoFantasia && validacaoNome)) {
		fetch("/empresas/cadastrar",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					nomeFantasiaServer: nomeFant.value.trim(),
					nomeEmpresaServer: nomeEmpresa.value.trim(),
					emailServer: email.value.trim(),
					cnpjServer: cnpj.value.trim(),
					telServer: tel.value.trim(),
				})
			}).then(function(resposta) {
				console.log("resposta: ", resposta);

				document.getElementById("modal").classList.add("active");

				if (resposta.ok) {
					modalTitle.innerHTML = "Cadastro realizado com <span>sucesso</span> 🍃"
					botaoCadastrar.innerHTMl = `
                       <span style='color:green'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                            </svg>
                        </span>
                    `
					sessionStorage.PERMISSAO = 1;
					alert('Redirecionando para cadastro de usuário');
					setTimeout(location.replace("/cadastroPersona.html"), 10000);

				} else {
					botaoCadastrar.innerHTML = `<span style='color:red'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" class="bi bi-exclamation-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                        </svg>
                    </span>`
					modalTitle.innerHTML = "Houve um <span style='color: red;'>erro</span> ao realizar o cadastro"
					resposta.json().then((j) => {
						modalContent.innerHTML = j;
					});
				}
			})
			.catch(function(resposta) {
				console.log(`#ERRO: ${resposta}`);
			});
	} else {
		return;
	}


}


document.getElementById("close-modal").addEventListener("click", function() {
	document.getElementById("overlay").classList.remove("active");
	document.getElementById("modal").classList.remove("active");
});
