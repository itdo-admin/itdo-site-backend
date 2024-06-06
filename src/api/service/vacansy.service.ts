import { getJobsAllSchema } from "../../validation/userSchemas.js";
import { getVacancyAll } from "../../model/model.client.js";


export async function getVacancyService() {
	try {
		const vcAll = await getVacancyAll();
		// const validatedUser = await getJobsAllSchema(vcAll);
		return vcAll.rows[0]

	} catch (e) {
		console.log(e);
		return new Error('Error getVacancyService');
	}
}
