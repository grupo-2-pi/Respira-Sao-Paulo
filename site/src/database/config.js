import mysql from "mysql2";

import { envVars } from "../env/env.js";

const mySqlConfig = {
  host: envVars.dbHost,
  database: envVars.dbDatabase,
  user: envVars.dbUser,
  password: envVars.dbPassword,
  port: envVars.dbPort
};

export function executar(instrucao) {
  if (
    process.env.AMBIENTE_PROCESSO !== "producao" &&
    process.env.AMBIENTE_PROCESSO !== "desenvolvimento"
  ) {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n"
    );
    return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
  }

  return new Promise((resolve, reject) => {
    const conexao = mysql.createConnection(mySqlConfig);
    conexao.connect();
    conexao.query(instrucao, (erro, resultados) => {
      conexao.end();
      if (erro) {
        reject(erro);
        return;
      }
      console.log(resultados);
      resolve(resultados);
    });
    conexao.on("error", (erro) => {
      console.error("ERRO NO MySQL SERVER: ", erro.sqlMessage);
    });
  });
}
