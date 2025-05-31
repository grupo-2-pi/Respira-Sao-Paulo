import { buscarDadosUser } from "../models/loginModel.js";

export async function validarUser(req, res) {

    if (req.body.emailServer == undefined || req.body.senhaServer == undefined) {
        res.status(400).send("Dados undefined");
    }

    try {

        const buscarDado = await buscarDadosUser(req.body.emailServer, req.body.senhaServer);

        if (buscarDado.length == 1) {
            return res.status(200).send(buscarDado[0]
            );
        }else{

            res.status(403).send("Email e/ou senha inválido(s)");

        }


    } catch {
        console.log("Erro ao buscar comentarios " + e);

        return res.status(500).send(e);
    }


};