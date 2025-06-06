import { executar } from "../database/config.js"

export async function buscarDadosUser(email, senha){


    const selectValidacaoUm = `SELECT idFuncionario, cpfFuncionario, nomeFuncionario, emailFuncionario, cargoFuncionario, isGerente, idEmpresa, isFirstLogin  
    FROM Funcionario WHERE emailFuncionario = '${email}' and senha = '${senha}'
    `;

    const selectValidacaoDois = `SELECT idAdmin, nome, email, isRespiraSP FROM Administrador WHERE email = '${email}' AND senha = '${senha}' and idAdmin IS NOT NULL
    `;


    const resultadoUm = await executar(selectValidacaoUm);
    const resultadoDois = await executar(selectValidacaoDois);

    if(resultadoDois.length > 0){
        return resultadoDois;
    }else{
        return resultadoUm;
    }

    
}