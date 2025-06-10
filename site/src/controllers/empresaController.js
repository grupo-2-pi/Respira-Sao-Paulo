import * as empresaModel from "../models/empresaModel.js";


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

export async function listar(req, res) {
  try {
    const resultado = await empresaModel.listar();
    res.json(resultado);
  } catch (erro) {
    console.error("Erro ao listar empresas:", erro);
    res.status(500).json({ erro: "Erro ao listar empresas" });
  }
}

export async function deletar(req, res) {
  const cnpj = req.params.cnpj;

  if (!cnpj) {
    return res.status(400).send("CNPJ está undefined!");
  }

  empresaModel.deletar(cnpj)
    .then((resultado) => {
      res.json({ mensagem: "Empresa deletada com sucesso!", resultado });
    })
    .catch((erro) => {
      console.error("Erro ao deletar empresa:", erro);
      res.status(500).json({ erro: "Erro ao deletar empresa" });
    });
}

export function atualizar(req, res) {
  const { cnpj, fantasia, empresa, email, tel, cnpjOriginal } = req.body;

  console.log("Dados recebidos no controller:", req.body);

  if (!fantasia || !empresa || !email || !cnpj || !tel) {
    return res.status(400).send("Campos obrigatórios não foram enviados.");
  }

  empresaModel.atualizar(fantasia, empresa, email, cnpj, tel, cnpjOriginal)
    .then((resultado) => res.json({ mensagem: "Empresa atualizada!", resultado }))
    .catch((erro) => {
      console.error("Erro ao atualizar empresa:", erro);
      res.status(500).json({ erro: "Erro ao atualizar empresa" });
    });
}
