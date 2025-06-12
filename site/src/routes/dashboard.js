import express from "express";
import { obterDadosDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/dados", obterDadosDashboard);

export default router;
