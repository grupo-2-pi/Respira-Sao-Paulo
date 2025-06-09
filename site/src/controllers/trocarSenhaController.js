import { alterarSenha } from "../models/trocarSenhaModel.js";

export async function alterarSenhaController(req, res) {



    try {

        const buscarDado = await alterarSenha(req.body.senhaServer, req.body.idServer);

        return res.status(200).send();

    } catch {

        return res.status(500);
    }


};