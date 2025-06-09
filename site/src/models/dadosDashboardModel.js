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
        SELECT municipio, valorTotal, numeroInternacoes, numeroObitos, taxaMortalidade
        FROM MortalidadeRespiratoria
        WHERE regiao = '${regiao}' AND ano = '${ano}' AND mes = '${mes}';
    `;
    const resultado = await executar(query);
    return resultado;
}

export async function getDadosQualidadeAr(regiao, ano, mes) {
    const query = `
        SELECT municipio, poluente, valor, unidade
        FROM QualidadeAr
        WHERE regiao = '${regiao}' AND ano = '${ano}' AND mes = '${mes}';
    `;
    const resultado = await executar(query);
    return resultado;
}

//GRAFICO DOIS DO MODO AMBIENTAL - EVOLUÇÃO MENSAL DE POLUIÇÃO 
export async function getQualidadeArPorRegiaoTodosMeses(regiao, ano) {
    const query = `
        SELECT municipio, mes, valor, ano
        FROM QualidadeAr
        WHERE regiao = '${regiao}' AND ano = '${ano}';
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
        AND (ano = '2023' OR ano = '2024')
        GROUP BY ano, mes
        ORDER BY FIELD(mes,
            'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
            'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro');
    `;
    return await executar(query);
}
