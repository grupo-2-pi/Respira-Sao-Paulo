import { executar } from "../database/config.js"

export async function alterarSenha(senha, idUsuario){


    const updateSenha = `UPDATE Funcionario SET senha = '${senha}' , validarSenha = '${senha}' ,
    isFirstLogin = FALSE WHERE idFuncionario = '${idUsuario}' ;
    `;

    const resultado = await executar(updateSenha);

    return resultado;
}