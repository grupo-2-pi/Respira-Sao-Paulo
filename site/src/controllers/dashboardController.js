import {
	getDadosFrotaCirculante,
	getDadosMortalidade,
	getDadosQualidadeAr,
	getQualidadeArPorRegiaoTodosMeses,
	getRankingPoluentes,
	getGastosPorMes,
	calcularVariacaoInternacoes,
	calcularVariacaoQualidadeAr
} from "../models/dadosDashboardModel.js";

export async function obterDadosDashboard(req, res) {
	try {
		const { regiao, ano, mes } = req.query;

		if (!regiao || !ano || !mes) {
			return res.status(400).json({ erro: "Parâmetros regiao, ano e mes são obrigatórios!" });
		}

		console.log(ano);

		const frota = await getDadosFrotaCirculante(regiao, ano, mes);
		const mortalidade = await getDadosMortalidade(regiao, ano, mes);
		const qualidadeAr = await getDadosQualidadeAr(regiao, ano, mes);
		const qualidadeArTodosMeses = await getQualidadeArPorRegiaoTodosMeses(regiao, ano);
		const rankingPoluente = await getRankingPoluentes(regiao, ano, mes);
		const gastos = await getGastosPorMes(regiao);
		const variacaoInternacoes = await calcularVariacaoInternacoes(regiao, ano, mes);
		const variacaoQualidadeAr = await calcularVariacaoQualidadeAr(regiao, ano, mes);





		const resposta = {
			kpis: {
				maisPoluido: qualidadeAr.length > 0 ? qualidadeAr[0].municipio : "Sem dados",
				maiorIndiceDoencas: mortalidade.length > 0 ? mortalidade[0].municipio : "Sem dados",
				valorGasto: mortalidade.length > 0 ? mortalidade[0].valorTotal : 0,
				taxaMortalidade: mortalidade.length > 0 ? mortalidade[0].taxaMortalidade : 0,
				rankingPoluente: rankingPoluente.length > 0 ? rankingPoluente[0].poluente : "Sem dados",
				variacaoInternacoes: variacaoInternacoes,
				variacaoQualidadeAr: variacaoQualidadeAr

			},
			graficos: {
				frota,
				mortalidade,
				qualidadeAr,
				qualidadeArTodosMeses,
				gastosAnuais: gastos
			}
		};

		res.status(200).json(resposta);
	} catch (erro) {
		console.error("Erro ao obter dados do dashboard:", erro);
		res.status(500).json({ erro: "Erro interno ao buscar dados do dashboard" });
	}
}
