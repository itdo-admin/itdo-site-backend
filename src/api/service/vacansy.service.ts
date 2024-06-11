import { addVacancy, deleteVacancy, getVacancyAll, getVacancyId, updateVacancy } from "../../model/model.client.js";
import type { IGetVacancyAllResult } from "../../model/types";
import type {InsertJob, Job, JobOptional} from "../../validation/userSchemas";

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
		return vc.rows[0];
	} catch (e) {
		console.log(e);
		return new Error('Error getVacancyIdService');
	}
}

export async function updateVacancyService(data: JobOptional) {
	try {
		const vc = await updateVacancy(data);
		return vc.rowCount !== null && vc.rowCount > 1;
	} catch (e) {
		console.log(e);
		return new Error('Error updateVacancyService');
	}
}

export async function deleteVacancyService(id: number) {
	try {
		const vc = await deleteVacancy(id);
		return vc.rows[0];
	} catch(e) {
		console.log(e);
		return new Error('Error deleteVacancyService');
	}
}

export async function addVacancyService(data: InsertJob) {
	try {
		const vc = await addVacancy(data);
		return vc.rows;
	} catch(e) {
		console.log(e);
		return new Error('Error deleteVacancyService');
	}
}
