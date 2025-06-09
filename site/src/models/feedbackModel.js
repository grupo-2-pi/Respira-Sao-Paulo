import { executar } from "../database/config.js"
const regioesSP = [
  "ABC",
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
  "Vale do Ribeira"
];

export async function insertComentario(descricao, classificacao, regiao, tipoPoluicao) {
  const query = `
  INSERT INTO FeedbackPopulacao (descricao, tipoPoluicao, regiao, dtEnvio, classificacao)
  VALUES
  ('${descricao}', '${tipoPoluicao}', '${regiao}', now(), '${classificacao}'); 
  `;

  await executar(query);
}

export async function buscarKpis(regiao) {

  const queryCausaDominante = `
              SELECT tipoPoluicao
              FROM FeedbackPopulacao
              WHERE classificacao = (
                  SELECT MIN(classificacao)
                  FROM FeedbackPopulacao
                  WHERE dtEnvio >= CURDATE() - INTERVAL 30 DAY
              )
              AND dtEnvio >= CURDATE() - INTERVAL 30 DAY
              LIMIT 1;
  `;
  const resultCausa = await executar(queryCausaDominante);

  console.log(resultCausa);

  const queryTotalComentarios = `
     SELECT regiao, COUNT(*) AS totalComentarios
    FROM FeedbackPopulacao
    WHERE dtEnvio >= CURDATE() - INTERVAL 30 DAY
    GROUP BY regiao
    ORDER BY totalComentarios DESC
    LIMIT 1;
  `;

  const resultTotalComentarios = await executar(queryTotalComentarios);

  const queryNotaTotal = `
    SELECT AVG(classificacao) AS media_classificacao
      FROM FeedbackPopulacao
      WHERE dtEnvio >= CURDATE() - INTERVAL 30 DAY;
  `;;

  const resultNotaTotal = await executar(queryNotaTotal);

  return {
    causaDominante: resultCausa[0].tipoPoluicao,
    totalComentarios: `${resultTotalComentarios[0]?.regiao || 'Nenhuma região'} - ${resultTotalComentarios[0]?.totalComentarios || 0} comentários`,
    notaTotal: resultNotaTotal[0]
  };
}

export async function buscarGraficos() {
  let arr = [];

  for (const r of regioesSP) {

    const queryComentariosPorRegiao = `
      SELECT COUNT(*) AS totalComentarios
      FROM FeedbackPopulacao
      WHERE regiao = '${r}';
    `;

    const result = await executar(queryComentariosPorRegiao);

    arr.push({
      r,
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
