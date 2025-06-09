import { executar } from "../database/config.js"

export async function buscarDadosUser(email, senha) {
	const selectValidacaoUm = `SELECT idFuncionario, cpfFuncionario, nomeFuncionario, emailFuncionario, cargoFuncionario, isGerente, idEmpresa, isFirstLogin  
    FROM Funcionario WHERE emailFuncionario = '${email}' and senha = '${senha}'
    `;

	const resultadoUm = await executar(selectValidacaoUm);


	return resultadoUm;
}

export async function buscarDadosUserAdm(email, senha) {
	const selectValidacaoDois = `SELECT idAdmin, nome, email FROM Administrador WHERE email = '${email}' AND senha = '${senha}'
    `;

	const resultadoDois = await executar(selectValidacaoDois);

	return resultadoDois;
}
