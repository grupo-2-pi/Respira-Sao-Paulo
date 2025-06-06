import { buscarKpis, buscarGraficos, buscarComentariosPaginados, insertComentario } from "../models/feedbackModel.js";

export async function buscarDados(req, res) {
  try {

    const { municipio } = req.params;

    const responseKpi = await buscarKpis(municipio);

    console.log(responseKpi);

    const responseGrafico = await buscarGraficos();

    return res.status(200).send({
      kpis: {
        causaDominante: responseKpi.causaDominante,
        totalComentarios: responseKpi.totalComentarios,
        notaTotal: responseKpi.notaTotal.media_classificacao
      },
      graficos: {
        responseGrafico
      }
    });

  } catch (e) {
    console.log("Erro ao buscar as kpis " + e);

    return res.status(500).send(e);
  }
}

export async function buscarComentarios(req, res) {
  try {
    const { inicio, fim } = req.params;

    const comentariosPaginados = await buscarComentariosPaginados(inicio, fim);

    return res.status(200).send({
      comentarios: comentariosPaginados
    });
  } catch (e) {
    console.log("Erro ao buscar comentarios " + e);

    return res.status(500).send(e);
  }
}

export async function criarComentario(req, res) {
  try {
    const { descricao, classificacao, regiao, tipoPoluicao } = req.body;

    await insertComentario(descricao, classificacao, regiao, tipoPoluicao);

    return res.status(201).send();
  } catch (e) {
    console.log(e);

    return res.status(500).send({
      error: e
    });
  }
}
