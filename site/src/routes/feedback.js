import express from "express";
import { buscarDados, buscarComentarios, criarComentario, } from "../controllers/feedbackController.js";

var router = express.Router();

router.get("/buscar/:municipio", (req, res) => {
    buscarDados(req, res);
});

router.get("/buscar/comentarios/:inicio/:fim", (req, res) => {
    buscarComentarios(req, res);
});

router.post("/criar", (req, res) => {
    criarComentario(req, res);
});

export default router;
