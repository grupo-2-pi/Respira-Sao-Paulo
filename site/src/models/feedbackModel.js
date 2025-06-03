import { executar } from "../database/config.js"
const regioesSP = [
  "ABC",
  "Centro",
  "Grande São Paulo",
  "Vale do Paraíba",
  "Campinas",
  "Sorocaba",
  "Baixada Santista",
  "Ribeirão Preto",
  "São Carlos",
  "Bauru",
  "Marília",
  "Araçatuba",
  "Presidente Prudente",
  "São José do Rio Preto",
  "Piracicaba",
  "Macro Região",
  "Vale do Ribeira"
];

export async function buscarKpis(municipio) {

  const queryCausaDominante = `
              SELECT tipoPoluicao
              FROM FeedbackPopulacao
              WHERE classificacao = (
                  SELECT MIN(classificacao)
                  FROM FeedbackPopulacao
              )
              LIMIT 1;
  `;
  const resultCausa = await executar(queryCausaDominante);

  console.log(resultCausa);

  const queryTotalComentarios = `
    SELECT COUNT(*) AS totalComentarios
    FROM FeedbackPopulacao
    WHERE municipio = '${municipio}'
      AND dtEnvio >= CURDATE() - INTERVAL 30 DAY;
  `;

  const resultTotalComentarios = await executar(queryTotalComentarios);

  const queryNotaTotal = `
      SELECT AVG(classificacao) AS media_classificacao
      FROM FeedbackPopulacao;
  `;

  const resultNotaTotal = await executar(queryNotaTotal);

  return {
    causaDominante: resultCausa[0].tipoPoluicao,
    totalComentarios: "São Paulo - " + resultTotalComentarios[0].totalComentarios + " comentários",
    notaTotal: resultNotaTotal[0]
  };
}

export async function buscarGraficos() {
  let arr = [];

  for (const regiao of regioesSP) {

    const queryComentariosPorRegiao = `
      SELECT COUNT(*) AS totalComentarios
      FROM FeedbackPopulacao
      WHERE municipio = '${regiao}';
    `;

    const result = await executar(queryComentariosPorRegiao);

    arr.push({
      regiao,
      totalComentarios: result[0]?.totalComentarios ?? 0
    });
  };
  return arr;
}

export async function buscarComentariosPaginados(inicio, fim) {
  const limit = fim - inicio + 1;
  const offset = inicio;

  const queryBuscar = `
  SELECT *
  FROM FeedbackPopulacao
  ORDER BY dtEnvio DESC
  LIMIT ${limit}
  OFFSET ${offset};
`;

  const resultadoBusca = await executar(queryBuscar);

  return resultadoBusca;
}