import {getVacancyAll, getVacancyId} from "../../model/model.client.js";
import type { IGetVacancyAllResult } from "../../model/types";

export async function getVacancyService(): Promise<IGetVacancyAllResult[][] | Error> {
	try {
		const vcAll = await getVacancyAll();
		return vcAll.rows
	} catch (e) {
		console.log(e);
		return new Error('Error getVacancyService');
	}
}

export async function getVacancyIdService(id: number) {
	try {
		const vc = await getVacancyId(id);
		return vc.rows;
	} catch (e) {
		console.log(e);
		return new Error('Error getVacancyIdService');
	}
}
