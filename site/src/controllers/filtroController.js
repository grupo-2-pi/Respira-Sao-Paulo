import { buscarFiltrosFuncionario, criar, atualizar,remover } from "../models/filtroModel.js";

export async function buscarFiltros(req, res) {
  try {

    const { idFuncionario } = req.params;

    console.log(idFuncionario);

    const filtros = await buscarFiltrosFuncionario(idFuncionario);

    return res.status(200).send({
      filtros
    });

  } catch (e) {
    return res.status(500).send({
      message: e
    });
  }
}

export async function criarFiltro(req, res) {
  try {
    const { regiao, ano, mes, idUsuario } = req.body; // Mudou os nomes

    await criar(regiao, ano, mes); // Só manda o que o MODEL precisa

    return res.status(201).send();
  } catch (e) {
    return res.status(500).send({
      message: e
    });
  }
}

export async function atualizarFiltro(req, res) {
  try {

    const { idFiltro } = req.params;
    const updateData = req.body;

    await atualizar(idFiltro, updateData);

    return res.status(200).send({
      message: "Filtro atualizado com sucesso"
    })
  } catch (e) {
    console.log(e);

    return res.status(500).send({
      message: e
    });
  }
}

export async function removerFiltro(req, res) {
  try {
    const { idFiltro } = req.params;

    await remover(idFiltro);

    return res.status(204).send();
  } catch (e) {
    console.log(e);

    return res.status(500).send({
      message: e
    });
  }
}