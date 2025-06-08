import { buscarDadosUser, buscarDadosUserAdm } from "../models/loginModel.js";

export async function validarUser(req, res) {

    if (req.body.emailServer == undefined || req.body.senhaServer == undefined) {
        res.status(400).send("Dados undefined");
    }

    try {

        var buscarDado;

        if (req.body.emailServer.includes("@respirasp.com")) {

            buscarDado = await buscarDadosUserAdm(req.body.emailServer, req.body.senhaServer);


        } else {

            buscarDado = await buscarDadosUser(req.body.emailServer, req.body.senhaServer);

        }
        if (buscarDado.length === 1) {
            return res.status(200).send(buscarDado[0]
            );
        } else {

            return res.status(403).send("Email e/ou senha inválido(s)");

        }


    } catch {

        return res.status(500);
    }


};