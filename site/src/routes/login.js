import express from "express";
var router = express.Router();
import {validarUser} from "../controllers/loginController.js";


router.post("/buscar", (req, res) => {
    validarUser(req, res);
});

export default router;