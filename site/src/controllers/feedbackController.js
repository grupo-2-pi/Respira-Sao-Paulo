import { buscarKpis, buscarGraficos, buscarComentariosPaginados } from "../models/feedbackModel.js";

export async function buscarDados(req, res) {
  try {

    const { municipio } = req.params;

    const responseKpi = await buscarKpis(municipio);
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