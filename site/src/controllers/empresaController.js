import { cadastrar } from "../models/empresaModel.js";


export function cadastrarEmpresa(req, res) {

  var fantasia = req.body.nomeFantasiaServer;
  var empresa = req.body.nomeEmpresaServer;
  var email = req.body.emailServer;
  var cnpj = req.body.cnpjServer;
  var tel = req.body.telServer;


  cadastrar(fantasia, empresa, email, cnpj, tel)
    .then(
      function (resultado) {
        res.json(resultado);
      }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      }
    );

}
