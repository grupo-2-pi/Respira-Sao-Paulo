import { executar } from "../database/config.js";

export async function buscarFiltrosFuncionario() {
  const queryBusca = `
    SELECT * FROM Filtro
  `

  const resultadoBusca = await executar(queryBusca);

  return resultadoBusca;
}

export async function criar(regiao, ano, mes) {
  const query = `
    INSERT INTO Filtro (nome, regiao, ano,mes,fkFuncionario,fkEmpresa) VALUES
    ('filtro Salvo', '${regiao}', '${ano}', '${mes}', null, null);
  `;

  // export async function criar(nome, regiao, ano, mes, idFuncionario, idEmpresa) {
  // const query = `
  //   INSERT INTO Filtro (nome, regiao, ano,mes,fkFuncionario,fkEmpresa) VALUES
  //   ('${nome}', '${regiao}', ${ano}, '${mes}', ${idFuncionario}, ${idEmpresa});
  // `;

  await executar(query);
}

export async function atualizar(idFiltro, updateData) {
  const campos = [];

  for (const [chave, valor] of Object.entries(updateData)) {
    if (valor !== undefined) {
      if (valor === null) {
        campos.push(`${chave} = ${valor}`)
      } else {
        campos.push(`${chave} = '${valor}'`);
      }
    }
  }

  if (campos.length === 0) {
    throw new Error("Nenhum campo para atualizar.");
  }

  const instrucao = `UPDATE Filtro SET ${campos.join(', ')} WHERE idFiltro = ${idFiltro};`;

  await executar(instrucao);
}

export async function remover(idFiltro) {
  const query = `
    DELETE FROM Filtro WHERE idFiltro = ${idFiltro};
  `;

  await executar(query);
}