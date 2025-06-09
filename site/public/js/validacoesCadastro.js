const nomeCompleto = document.getElementById("nomeCompleto");
const cpf = document.getElementById("cpf");
const cargo = document.getElementById("cargo");
const email = document.getElementById("email");
const cnpj = document.getElementById("cnpj");

const erroNome = document.getElementById("erro-nome");
const erroCPF = document.getElementById("erro-cpf");
const erroCargo = document.getElementById("erro-cargo");
const erroEmail = document.getElementById("erro-email");
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

function capitalizarParcial(texto) {
    return texto
        .split(' ')
        .map(palavra => {
            if (palavra.length === 0) return ""; // mantém espaços duplos temporários
            return palavra[0].toUpperCase() + palavra.slice(1).toLowerCase();
        })
        .join(' ');
}

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


nomeCompleto.addEventListener("input", () => {
    const cursorPos = nomeCompleto.selectionStart;
    nomeCompleto.value = capitalizarParcial(nomeCompleto.value);
    nomeCompleto.setSelectionRange(cursorPos, cursorPos); // mantém o cursor no lugar
    validarCampo(nomeCompleto, erroNome, validarNome);
});

cargo.addEventListener("input", () => {
    const cursorPos = cargo.selectionStart;
    cargo.value = capitalizarParcial(cargo.value);
    cargo.setSelectionRange(cursorPos, cursorPos); // mantém o cursor no lugar
    validarCampo(cargo, erroCargo, validarCargo);
});
cpf.addEventListener("input", () => validarCampo(cpf, erroCPF, validarCPF));
email.addEventListener("input", () => validarCampo(email, erroEmail, validarEmail));
cnpj.addEventListener("input", () => validarCampo(cnpj, erroCNPJ, validarCNPJ));

botaoCadastrar.addEventListener("click", async () => {
    const todosValidos =
        validarCampo(nomeCompleto, erroNome, validarNome) &&
        validarCampo(cpf, erroCPF, validarCPF) &&
        validarCampo(cargo, erroCargo, validarCargo) &&
        validarCampo(email, erroEmail, validarEmail) &&
        validarCampo(cnpj, erroCNPJ, validarCNPJ);

    if (!todosValidos) {
        mostrarMensagemCard("Existem campos inválidos. Verifique os campos destacados.", "alerta");
        return;
    }

    nomeCompleto.value = capitalizarParcial(nomeCompleto.value);
    cargo.value = capitalizarParcial(cargo.value);

    const inputGerente = document.getElementById("inputGerente");

    const dados = {
        nomeCompleto: nomeCompleto.value.trim(),
        cpf: cpf.value.trim(),
        cargo: cargo.value.trim(),
        email: email.value.trim(),
        cnpj: cnpj.value.trim(),
        isGerente: inputGerente.checked
    };

    try {
        const resposta = await fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            mostrarMensagemCard("Cadastro realizado com sucesso!", "sucesso");
            // Limpar campos se quiser
        } else {
            const erroTexto = await resposta.text();
            mostrarMensagemCard("Erro ao cadastrar: " + erroTexto, "erro");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        mostrarMensagemCard("Erro ao cadastrar. Tente novamente mais tarde.", "erro");
    }
});
