import express from "express";
var router = express.Router();
import {alterarSenhaController} from "../controllers/trocarSenhaController.js";


router.post("/alterar", (req, res) => {
    alterarSenhaController(req, res);
});

export default router;