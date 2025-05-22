import dotenv from 'dotenv';

const ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

dotenv.config({ path: caminho_env });

export const envVars = {
  dbPassword : process.env.DB_PASSWORD,
  dbHost : process.env.DB_HOST,
  dbPort : process.env.DB_PORT,
  dbDatabase : process.env.DB_DATABASE,
  dbUser : process.env.DB_USER,
  appHost : process.env.APP_HOST,
  appPort : process.env.APP_PORT,
  env: process.env.AMBIENTE_PROCESSO
};

console.log(envVars);