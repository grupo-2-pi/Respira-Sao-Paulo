import express from 'express';
import * as usuarioController from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/autenticar', usuarioController.autenticar);

router.post('/cadastrar', usuarioController.cadastrar);

router.get('/listar/:idEmpresa', usuarioController.listarTodos);

router.get('/listar/:cargo', usuarioController.listarPorCargo);

router.delete('/deletar/:id', usuarioController.deletarFuncionario); 

router.put('/atualizar', usuarioController.atualizarFuncionario);

export default router;