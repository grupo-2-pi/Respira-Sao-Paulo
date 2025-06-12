import { executar } from "../database/config.js";


export function cadastrar(fantasia, empresa, email, cnpj, tel) {
  const instrucaoSql = `INSERT INTO Empresa (nomeFantasia, cnpj, nomeEmpresa, emailContato, telefoneContato) VALUES ('${fantasia}', '${cnpj}', '${empresa}', '${email}', '${tel}')`;

  return executar(instrucaoSql);
}

export function listar() {
  const instrucaoSql = 'SELECT nomeFantasia, cnpj, nomeEmpresa, emailContato, telefoneContato FROM Empresa';

  return executar(instrucaoSql);
}

export function deletar(cnpj) {
  const instrucaoSql = `DELETE FROM Empresa WHERE cnpj = ${cnpj};`;

  return executar(instrucaoSql);
}

export function atualizar(fantasia, empresa, email, cnpj, tel, cnpjOriginal) {
  const instrucaoSql = `
    UPDATE Empresa
    SET nomeFantasia = '${fantasia}', cnpj = '${cnpj}', nomeEmpresa = '${empresa}', emailContato = '${email}', telefoneContato = '${tel}'
    WHERE cnpj = '${cnpj}';
  `;
  
  return executar(instrucaoSql);

}
