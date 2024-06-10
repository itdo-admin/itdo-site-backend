import { sql } from "sqlx-ts"
import client from "./main.js"
import type {
	DeleteJobParams,
	GetVacancyAllParams, GetVacancyIdParams,
	IDeleteJobResult, IGetVacancyAllResult, IGetVacancyIdResult,
	IInsertJobResult, InsertJobParams
} from "./types";
import {type InsertJob, type job} from "../validation/userSchemas.js";
import type {QueryResult, QueryResultBase} from "pg";

export async function getVacancyAll(){
	try {
		return await client.query<IGetVacancyAllResult[], GetVacancyAllParams>(sql`
			-- @name: getVacancyAll
			SELECT * FROM jobs;`)
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function getVacancyId(id: number) {
	try {
		return await client.query<IGetVacancyIdResult, GetVacancyIdParams>(sql`
			-- @name: getVacancyId
			SELECT * FROM jobs WHERE id = $1 LIMIT 1;`, [id])
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function updateVacancy(body: job): Promise<QueryResultBase> {
	try {
		let query = 'UPDATE jobs SET '

		const setClauses = Object.keys(body).map((key, index) => {
			const value = body[key as keyof job];
			return `${key} = $${index + 1}`;
		});

		const values = Object.values(body);

		const finalQuery = `${query}${setClauses.join(', ')}`;

		// Необходимо преобразование, потому что иначе возникает ошибка типизации
		return await client.query(sql(finalQuery as unknown as TemplateStringsArray), values)
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function deleteVacancy(id: number) {
	return client.query<IDeleteJobResult, DeleteJobParams>(sql`
		-- @name: deleteJob
		DELETE FROM jobs WHERE id = $1`, [id])
}

export async function addVacancy(body: InsertJob) {
	const values = Object.keys(body).map(key => body[key as keyof InsertJob]) as InsertJobParams;
	return client.query<IInsertJobResult, InsertJobParams>(sql`
		-- @name: insertJob
		INSERT INTO jobs (title, description, summary, photo, salary) VALUES ($1, $2, $3, $4, $5)`, values)
}
