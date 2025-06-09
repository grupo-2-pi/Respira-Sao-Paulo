import { executar } from "../database/config.js";

export function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
    const instrucaoSql = `
        SELECT id, nome, email, fk_empresa as empresaId FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return executar(instrucaoSql);
}

export function verificarCnpjExiste(cnpj) {
    const instrucaoSql = `SELECT COUNT(*) AS total FROM Empresa WHERE cnpj = '${cnpj}';`;
    console.log("Executando a instrução SQL para verificar CNPJ: \n" + instrucaoSql);
    return executar(instrucaoSql).then(resultado => {
        // resultado é um array com o retorno da query
        return resultado[0].total > 0;
    });
}

export function cadastrar(nomeCompleto, cpf, cargo, email, cnpj, isGerente) {
    console.log("ACESSEI O USUARIO MODEL para cadastrar: ", nomeCompleto, cpf, cargo, email, cnpj, isGerente);

    const cnpjLimpo = cnpj.replace(/[^\d]/g, '');
    console.log("CNPJ limpo usado no SQL:", cnpjLimpo);

    const instrucaoSql = `
        INSERT INTO Funcionario (
            nomeFuncionario,
            cpfFuncionario,
            cargoFuncionario,
            emailFuncionario,
            cnpj,
            senha,
            validarSenha,
            idEmpresa,
            isFirstLogin,
            isGerente
        ) VALUES (
            '${nomeCompleto}',
            '${cpf}',
            '${cargo}',
            '${email}',
            '${cnpjLimpo}',
            '${cpf}',
            '${cpf}',
            (
                SELECT idEmpresa 
                FROM Empresa 
                WHERE REPLACE(REPLACE(REPLACE(REPLACE(CNPJ, '.', ''), '/', ''), '-', ''), ' ', '') = '${cnpjLimpo}'
                LIMIT 1
            ),
            true,
            ${isGerente ? 1 : 0}
        );
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return executar(instrucaoSql);
}

export function listarTodos() {
    const sql = `SELECT * FROM Funcionario;`;
    return executar(sql);
}

export function listarPorCargo(cargo) {
    const sql = `SELECT * FROM Funcionario WHERE cargoFuncionario = '${cargo}';`;
    return executar(sql);
}

export function deletarFuncionario(idFuncionario) {
    console.log("ACESSEI O USUARIO MODEL - deletarFuncionario");

    const instrucaoSql = `
        DELETE FROM Funcionario WHERE idFuncionario = ${idFuncionario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return executar(instrucaoSql);
}

export function atualizarFuncionario(idFuncionario, nomeFuncionario, cargoFuncionario) {
    const instrucao = `
    UPDATE Funcionario
    SET nomeFuncionario = '${nomeFuncionario}', cargoFuncionario = '${cargoFuncionario}'
    WHERE idFuncionario = ${idFuncionario};
  `;
    return executar(instrucao);
}
