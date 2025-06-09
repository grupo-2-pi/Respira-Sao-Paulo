import { logarAdmin } from "../models/adminModel.js";

export async function adminController(req, res) {

	try {

		const { email, password } = req.body;

		const response = await logarAdmin(email, password);

		if (response === 0) {
			return res.status(401).send({
				message: "Email ou senha inválidos para acesso de admin"
			});
		}

		return res.status(200).send();

	} catch (e) {

		return res.status(500).send({
			message: e
		})
	}
}
