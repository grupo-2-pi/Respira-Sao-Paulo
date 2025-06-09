import "./src/env/env.js";
import { envVars } from "./src/env/env.js";

import feedbackRouter from './src/routes/feedback.js';
import filtroRouter from "./src/routes/filtro.js";
import dashboardRouter from './src/routes/dashboard.js';
import usuariosRouter from './src/routes/usuarios.js';
import empresasRouter from './src/routes/empresas.js';  //adicionei isso
import empresaRouter from "./src/routes/empresas.js";
import loginRouter from "./src/routes/login.js";
import trocarSenhaRouter from "./src/routes/trocarSenha.js";
import adminRouter from "./src/routes/admin.js"
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());


app.use("/feedback", feedbackRouter);
app.use("/filtro", filtroRouter);
app.use("/dashboard", dashboardRouter);
app.use("/usuarios", usuariosRouter);
app.use("/empresas", empresasRouter); // adicionei isso
app.use("/empresas", empresaRouter);
app.use("/login", loginRouter);
app.use("/trocarSenha", trocarSenhaRouter);
app.use("/admin", adminRouter);


app.listen(envVars.appPort, "0.0.0.0", () => {
	console.log(`
    Servidor rodando em: http://${envVars.appHost}:${envVars.appPort}
    Ambiente: ${envVars.env}
  `);
});
