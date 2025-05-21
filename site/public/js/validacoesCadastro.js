const nomeCompleto = document.getElementById("nomeCompleto");
const cpf = document.getElementById("cpf");
const cargo = document.getElementById("cargo");
const email = document.getElementById("email");
const nomeEmpresa = document.getElementById("nomeEmpresa");
const cnpj = document.getElementById("cnpj");

const erroNome = document.getElementById("erro-nome");
const erroCPF = document.getElementById("erro-cpf");
const erroCargo = document.getElementById("erro-cargo");
const erroEmail = document.getElementById("erro-email");
const erroEmpresa = document.getElementById("erro-empresa");
const erroCNPJ = document.getElementById("erro-cnpj");

const botaoCadastrar = document.querySelector(".botao-cadastrar");

const dominiosPermitidos = [
    "gmail.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com",
    "sptech.school",
    "respira.sp"
];

function validarNome(nome) {
    const partes = nome.trim().split(" ");
    return partes.length > 1 && partes.every(parte => parte.length >= 2);
}

function validarCPF(cpf) {
    return cpf.length === 11 && !isNaN(cpf);
}

function validarCargo(cargo) {
    return cargo.length >= 2;
}

function validarEmail(email) {
    const partes = email.split("@");
    if (partes.length !== 2) return false;
    
    const dominio = partes[1];
    return dominiosPermitidos.includes(dominio);
}

function validarNomeEmpresa(nomeEmpresa) {
    return nomeEmpresa.length >= 2;
}

function validarCNPJ(cnpj) {
    return cnpj.length === 14 && !isNaN(cnpj);
}

function validarCampo(campo, erro, validacao) {
    if (validacao(campo.value.trim())) {
        erro.style.display = "none";
        campo.classList.remove("input-error");
        campo.classList.add("input-valid");
        return true;
    } else {
        erro.style.display = "block";
        campo.classList.add("input-error");
        campo.classList.remove("input-valid");
        return false;
    }
}

nomeCompleto.addEventListener("input", () => validarCampo(nomeCompleto, erroNome, validarNome));
cpf.addEventListener("input", () => validarCampo(cpf, erroCPF, validarCPF));
cargo.addEventListener("input", () => validarCampo(cargo, erroCargo, validarCargo));
email.addEventListener("input", () => validarCampo(email, erroEmail, validarEmail));
nomeEmpresa.addEventListener("input", () => validarCampo(nomeEmpresa, erroEmpresa, validarNomeEmpresa));
cnpj.addEventListener("input", () => validarCampo(cnpj, erroCNPJ, validarCNPJ));

botaoCadastrar.addEventListener("click", () => {
    const todosValidos = 
        validarCampo(nomeCompleto, erroNome, validarNome) &&
        validarCampo(cpf, erroCPF, validarCPF) &&
        validarCampo(cargo, erroCargo, validarCargo) &&
        validarCampo(email, erroEmail, validarEmail) &&
        validarCampo(nomeEmpresa, erroEmpresa, validarNomeEmpresa) &&
        validarCampo(cnpj, erroCNPJ, validarCNPJ);

    if (!todosValidos) {
        alert("Existem campos inválidos. Verifique os campos destacados.");
    }
});
