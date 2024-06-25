import { sql } from "sqlx-ts"
import client from "./main.js"
import type {
	GetVacancyAllParams,
	GetVacancyIdParams,
	IGetAllProjectFullResult,
	IGetProjectAllShortResult,
	IGetVacancyAllResult,
	IGetVacancyIdResult,
} from "./types";

export async function getVacancyAll(){
	try {
		return await client.query<IGetVacancyAllResult[], GetVacancyAllParams>(sql`
			-- @name: getVacancyAll
			SELECT id, title, description, summary, salary FROM jobs;`);
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function getVacancyId(id: number) {
	try {
		return await client.query<IGetVacancyIdResult, GetVacancyIdParams>(sql`
			-- @name: getVacancyId
			SELECT id, title, description, summary, salary FROM jobs WHERE id = $1 LIMIT 1;`, [id]);
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function getProjectsAllShort() {
	try {
		return await client.query<IGetProjectAllShortResult>(sql`
			-- @name: getProjectAllShort
			SELECT id, title, description, summary, photo, color FROM projects LIMIT 4`);
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function getProjectsAllFull() {
	try {
		return await client.query<IGetAllProjectFullResult>(sql`
			-- @name: getAllProjectFull
			SELECT id, title, description, summary, photo FROM projects`);
	} catch (e) {
		console.log(e);
		throw e;
	}
}
