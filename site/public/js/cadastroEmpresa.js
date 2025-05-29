var nomeFant = document.getElementById("nomeFantasia");
var nomeEmpresa = document.getElementById("nomeEmpresa");
var email = document.getElementById("emailEmpresa");
var cnpj = document.getElementById("numCnpj");
var tel = document.getElementById("telEmpresa");

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
        alert("ok!");

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
            }).then(function (resposta) {
                console.log("resposta: ", resposta);
                if (resposta.ok) {
                    alert("banco de dados ok");
                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                alert("deu tudo errado na inserção")
            });

    } else {
        alert("dados invalidos!");
        return;
    }
}

//fazer aparecer a mensagem de erro quando algum campo estiver incorreto
//fazer o fetch
//fazer a rota -> controller -> model


