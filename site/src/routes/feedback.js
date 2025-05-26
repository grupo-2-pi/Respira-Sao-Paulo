import express from "express";
import { buscarDados, buscarComentarios } from "../controllers/feedbackController.js";

var router = express.Router();

router.get("/buscar/:municipio", (req, res) => {
    buscarDados(req, res);
});

router.get("/buscar/comentarios/:inicio/:fim", (req, res) => {
    buscarComentarios(req, res);
});

export default router;
