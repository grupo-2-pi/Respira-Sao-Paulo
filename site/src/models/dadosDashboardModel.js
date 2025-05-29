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

export async function getQualidadeArPorRegiaoTodosMeses(regiao) {
    const query = `
        SELECT municipio, mes, valor
        FROM QualidadeAr
        WHERE regiao = '${regiao}';
    `;
    return await executar(query);
}
