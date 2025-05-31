import { executar } from "../database/config.js"

export async function buscarDadosUser(email, senha){


    const selectValidacao = `SELECT idFuncionario, cpfFuncionario, nomeFuncionario, emailFuncionario, cargoFuncionario, isGerente, idEmpresa, isFirstLogin  
    FROM Funcionario WHERE emailFuncionario = '${email}' and senha = '${senha}'
    `;

    const resultado = await executar(selectValidacao);

    return resultado;
}