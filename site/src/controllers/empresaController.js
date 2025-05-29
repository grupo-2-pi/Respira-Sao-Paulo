var empresaModel = require("../models/empresaModel");


function cadastrar(req, res) {

  var fantasia = req.body.nomeFantasiaServer;
  var empresa = req.body.nomeEmpresaServer;
  var email = req.body.emailServer;
  var cnpj = req.body.cnpjServer;
  var tel = req.body.telServer;
 
 
  usuarioModel.cadastrar(fantasia, empresa, email, cnpj, tel)
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


module.exports = {
  cadastrar,
};
