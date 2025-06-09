import express from "express";
import { cadastrarEmpresa } from "../controllers/empresaController.js";

const router = express.Router();
 
 router.post("/cadastrar", function (req, res) {
    cadastrarEmpresa(req, res);
 })

export default router;


