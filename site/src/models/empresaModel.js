var database = require("../database/config");


function cadastrar(fantasia, empresa, email, cnpj, tel) {
  var instrucaoSql = `INSERT INTO Empresa (nomeFantasia, cnpj, nomeEmpresa, emailContato, telefoneContato) VALUES ('${fantasia}', '${cnpj}', '${empresa}', '${email}', '${tel}')`;

  return database.executar(instrucaoSql);
}

module.exports = {cadastrar};
