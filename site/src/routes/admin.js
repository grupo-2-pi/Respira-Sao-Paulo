import express from "express";

import { adminController } from "../controllers/adminController.js";

var router = express.Router();

router.post("/login", (req, res) => {
	adminController(req, res);
});

export default router;
