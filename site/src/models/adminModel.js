import { executar } from "../database/config.js";

export async function logarAdmin(email, password) {

	const query = `
		SELECT * FROM Admin WHERE email = '${email}' AND senha = '${password}'
`;

	const result = await executar(query);

	return result.length;
}
