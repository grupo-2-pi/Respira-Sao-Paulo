import express from "express";

import { buscarFiltros, criarFiltro, atualizarFiltro, removerFiltro } from "../controllers/filtroController.js";

var router = express.Router();

router.get("/buscar/:idFuncionario", (req, res) => {
    buscarFiltros(req, res);
});

router.post("/criar", (req, res) => {
    criarFiltro(req, res);
});

router.put("/atualizar/:idFiltro", (req, res) => {
    atualizarFiltro(req, res);
});

router.delete("/deletar/:idFiltro", (req, res) => {
    removerFiltro(req, res);
})

export default router;