import { executar } from "../database/config.js";

export async function getDadosFrotaCirculante(regiao, ano, mes) {
	const query = `
        SELECT municipio, automoveis, comerciais_leves, caminhoes, onibus, motos
        FROM FrotaCirculante
        WHERE regiao = '${regiao}' AND ano = '${ano}' AND mes = '${mes}';
    `;
	const resultado = await executar(query);
	return resultado;
}

export async function getDadosMortalidade(regiao, ano, mes) {
	const query = `
        SELECT municipio,regiao, valorTotal, numeroInternacoes, numeroObitos, taxaMortalidade
        FROM MortalidadeRespiratoria
        WHERE regiao = '${regiao}' AND ano = '${ano}' AND mes = '${mes}';
    `;
	const resultado = await executar(query);
	return resultado;
}

export async function getDadosQualidadeAr(regiao, ano, mes) {
	const anoCorrigido = ano > 2021 ? 2021 : ano;

	const query = `
        SELECT municipio, poluente, valor, unidade
        FROM QualidadeAr
        WHERE regiao = '${regiao}' AND ano = '${anoCorrigido}' AND mes = '${mes}';
    `;
	const resultado = await executar(query);
	return resultado;
}

//GRAFICO DOIS DO MODO AMBIENTAL - EVOLUÇÃO MENSAL DE POLUIÇÃO 
export async function getQualidadeArPorRegiaoTodosMeses(regiao, ano) {
	console.log(ano);
	const anoCorrigido = ano > 2021 ? 2021 : ano;
	const query = `
        SELECT municipio, mes, valor, ano
        FROM QualidadeAr
        WHERE regiao = '${regiao}' AND ano = '${anoCorrigido}';
    `;
	return await executar(query);
}


//KPI RANKING DE POLUIÇÃO 
export async function getRankingPoluentes(regiao, ano, mes) {
	const query = `
        SELECT poluente, SUM(valor) AS total
        FROM QualidadeAr
        WHERE regiao = '${regiao}' AND ano = '${ano}' AND mes = '${mes}'
        GROUP BY poluente
        ORDER BY total DESC
        LIMIT 1;
    `;
	return await executar(query);
}


//GASTOS 2023 X 2024
export async function getGastosPorMes(regiao) {
	const query = `
        SELECT ano, mes,
            SUM(valorTotal) AS total_gasto
        FROM MortalidadeRespiratoria
        WHERE regiao = '${regiao}'
        AND (ano = '2022' OR ano = '2023')
        GROUP BY ano, mes
        ORDER BY FIELD(mes,
            'JAN','FEV','MAR','ABR','MAI','JUN',
            'JUL','AGO','SET','OUT','NOV','DEZ');
    `;
	return await executar(query);
}


export async function calcularVariacaoInternacoes(regiao, ano, mes) {
  const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const indexAtual = meses.indexOf(mes.toUpperCase());
  if (indexAtual === -1) return 0;

  const mesAtual = meses[indexAtual];
  const mesAnterior = indexAtual === 0 ? 'DEZ' : meses[indexAtual - 1];
  const anoAnterior = indexAtual === 0 ? (Number(ano) - 1).toString() : ano;

  const queryAtual = `
    SELECT SUM(numeroInternacoes) AS total
    FROM MortalidadeRespiratoria
    WHERE regiao = '${regiao}' AND ano = '${ano}' AND mes = '${mesAtual}'
  `;

  const queryAnterior = `
    SELECT SUM(numeroInternacoes) AS total
    FROM MortalidadeRespiratoria
    WHERE regiao = '${regiao}' AND ano = '${anoAnterior}' AND mes = '${mesAnterior}'
  `;

  const atual = await executar(queryAtual);
  const anterior = await executar(queryAnterior);

  const totalAtual = Number(atual[0]?.total || 0);
  const totalAnterior = Number(anterior[0]?.total || 0);

  if (totalAnterior === 0) return 0;

  const variacao = ((totalAtual - totalAnterior) / totalAnterior) * 100;
  return Number(variacao.toFixed(2));
}
