import express from "express";
import * as empresaController from "../controllers/empresaController.js";

const router = express.Router();
 
 router.post("/cadastrar", function (req, res) {
    empresaController.cadastrarEmpresa(req, res);
 })

router.get('/listar', empresaController.listar);

router.delete('/deletar/:cnpj', empresaController.deletar)

router.put('/atualizar', empresaController.atualizar);


export default router;


