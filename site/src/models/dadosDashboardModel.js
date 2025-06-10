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
export async function getRankingPoluentes(regiao, ano) {
	const query = `
		SELECT poluente, valor
		FROM QualidadeAr
		WHERE regiao = '${regiao}' AND ano = '${ano}'
		ORDER BY valor DESC
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

//KPI VARIACAO INTERNAÇOES 
export async function calcularVariacaoInternacoes(regiao, ano, mes) {
	const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
	const indexAtual = meses.indexOf(mes.toUpperCase());
	if (indexAtual === -1) return 0;

	const mesAtual = meses[indexAtual];
	const mesAnterior = indexAtual === 0 ? 'DEZ' : meses[indexAtual - 1];
	const anoAnterior = ano;

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

//KPI VARIACAO INTERNAÇOES 
export async function calcularVariacaoQualidadeAr(regiao, ano, mesSelecionado) {
	const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
	const idx = meses.indexOf(mesSelecionado.toUpperCase());
	if (idx < 2) return 0; // Não tem dois meses anteriores para comparar

	const mesMaisRecente = meses[idx - 1];  // mês M-1
	const mesMaisAntigo = meses[idx - 2];   // mês M-2

	const anoMaisRecente = (idx - 1 < 0) ? (parseInt(ano) - 1).toString() : ano;
	const anoMaisAntigo = (idx - 2 < 0) ? (parseInt(ano) - 1).toString() : ano;

	const queryRecente = `
    SELECT AVG(valor) AS media
    FROM QualidadeAr
    WHERE regiao = '${regiao}' AND ano = '${anoMaisRecente}' AND mes = '${mesMaisRecente}'
  `;

	const queryAntigo = `
    SELECT AVG(valor) AS media
    FROM QualidadeAr
    WHERE regiao = '${regiao}' AND ano = '${anoMaisAntigo}' AND mes = '${mesMaisAntigo}'
  `;

	const recente = await executar(queryRecente);
	const antigo = await executar(queryAntigo);

	const mediaRecente = Number(recente[0]?.media || 0);
	const mediaAntiga = Number(antigo[0]?.media || 0);

	if (mediaAntiga === 0) return 0;

	const variacao = ((mediaRecente - mediaAntiga) / mediaAntiga) * 100;
	return Number(variacao.toFixed(2));
}
