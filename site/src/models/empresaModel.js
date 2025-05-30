import { executar } from "../database/config.js";


export function cadastrar(fantasia, empresa, email, cnpj, tel) {
  const instrucaoSql = `INSERT INTO Empresa (nomeFantasia, cnpj, nomeEmpresa, emailContato, telefoneContato) VALUES ('${fantasia}', '${cnpj}', '${empresa}', '${email}', '${tel}')`;

  return executar(instrucaoSql);
}
