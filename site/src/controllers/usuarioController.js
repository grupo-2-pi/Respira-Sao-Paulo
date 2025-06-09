import * as usuarioModel from "../models/usuarioModel.js";

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                            .then((resultadoAquarios) => {
                                if (resultadoAquarios.length > 0) {
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha,
                                        aquarios: resultadoAquarios
                                    });
                                } else {
                                    res.status(204).json({ aquarios: [] });
                                }
                            })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

export async function cadastrar(req, res) {
    var nomeCompleto = req.body.nomeCompleto;
    var cpf = req.body.cpf;
    var cargo = req.body.cargo;
    var email = req.body.email;
    var cnpj = req.body.cnpj;
    var isGerente = req.body.isGerente; 

    if (!nomeCompleto) {
        return res.status(400).send("Nome completo está undefined!");
    }
    if (!cpf) {
        return res.status(400).send("CPF está undefined!");
    }
    if (!cargo) {
        return res.status(400).send("Cargo está undefined!");
    }
    if (!email) {
        return res.status(400).send("Email está undefined!");
    }
    if (!cnpj) {
        return res.status(400).send("CNPJ está undefined!");
    }

    if (typeof isGerente !== "boolean") {
        // Pode ser undefined ou string "true"/"false" se enviado via JSON, então converter:
        isGerente = isGerente === "true" || isGerente === true ? true : false;
    }

    try {
        const cnpjExiste = await usuarioModel.verificarCnpjExiste(cnpj);

        if (!cnpjExiste) {
            return res.status(400).json({ erro: "CNPJ informado não está cadastrado na empresa." });
        }

        const resultado = await usuarioModel.cadastrar(nomeCompleto, cpf, cargo, email, cnpj, isGerente);
        res.json(resultado);

    } catch (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    }
}



export async function listarTodos(req, res) {
    try {
        const resultado = await usuarioModel.listarTodos();
        res.json(resultado);
    } catch (erro) {
        console.error("Erro ao listar todos:", erro);
        res.status(500).json({ erro: "Erro ao listar usuários" });
    }
}

export async function listarPorCargo(req, res) {
    const cargo = req.params.cargo; // "Administrador" ou "Usuário"
    try {
        const resultado = await usuarioModel.listarPorCargo(cargo);
        res.json(resultado);
    } catch (erro) {
        console.error("Erro ao listar por cargo:", erro);
        res.status(500).json({ erro: "Erro ao listar por cargo" });
    }
}

export function deletarFuncionario(req, res) {
    const idFuncionario = req.params.id;

    if (!idFuncionario) {
        return res.status(400).send("ID do funcionário está undefined!");
    }

    usuarioModel.deletarFuncionario(idFuncionario)
        .then((resultado) => {
            res.json({ mensagem: "Funcionário deletado com sucesso!", resultado });
        })
        .catch((erro) => {
            console.error("Erro ao deletar funcionário:", erro);
            res.status(500).json({ erro: "Erro ao deletar funcionário" });
        });
}

export function atualizarFuncionario(req, res) {
    const { idFuncionario, nomeFuncionario, cargoFuncionario } = req.body;
    console.log("Dados recebidos:", req.body);

    if (!idFuncionario || !nomeFuncionario || !cargoFuncionario) {
        return res.status(400).send("Campos obrigatórios não foram enviados.");
    }

    usuarioModel.atualizarFuncionario(idFuncionario, nomeFuncionario, cargoFuncionario)
        .then((resultado) => res.json({ mensagem: "Funcionário atualizado!", resultado }))
        .catch((erro) => {
            console.error("Erro ao atualizar funcionário:", erro);
            res.status(500).json({ erro: "Erro ao atualizar funcionário" });
        });
}

export {
    autenticar
};
