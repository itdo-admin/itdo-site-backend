import client from "./main.js";
import type { DeleteJobParams, IDeleteJobResult, IInsertJobResult, InsertJobParams } from "./types";
import { sql } from "sqlx-ts";
import type { InsertJob, JobUpdate } from "../validation/userSchemas";
import type { QueryResultBase } from "pg";

interface UpdateJob {
	title?: string,
	description?: string,
	summary?: string,
	salary?: string
}

export async function deleteVacancy(id: number) {
	return client.query<IDeleteJobResult, DeleteJobParams>(sql`
		-- @name: deleteJob
		DELETE FROM jobs WHERE id = $1`, [id])
}

export async function addVacancy(body: InsertJob) {
	const values = Object.values(body) as InsertJobParams

	return client.query<IInsertJobResult, InsertJobParams>(sql`
		-- @name: insertJob
		INSERT INTO jobs (title, description, summary, salary) VALUES ($1, $2, $3, $4) RETURNING id`, values)
}

export async function updateVacancy(id: number, updatedData: UpdateJob): Promise<QueryResultBase> {
	try {
		const values = []

		let i = 1; // Потому что в sql с единицы считается
		let setClauses = [];
		let query: string = 'UPDATE jobs SET '

		for (const key in updatedData) {
			values.push(updatedData[key as keyof JobUpdate]);
			setClauses.push(`${key} = $${i}`)
			i++
		}

		const finalQuery = `${query}${setClauses.join(', ')} WHERE id = $${setClauses.length + 1}`;
		values.push(id)

		console.log(values)
		console.log(finalQuery)

		// sqlx не умеет в динамические запросы, возвращает первую букву запроса
		return client.query(finalQuery, values)
	} catch (e) {
		console.log(e);
		throw e;
	}
}
