import client from "./main.js";
import type { DeleteJobParams, IDeleteJobResult, IInsertJobResult, InsertJobParams } from "./types";
import { sql } from "sqlx-ts";
import type {InsertJob, JobOptional, JobUpdate} from "../validation/userSchemas";
import type { QueryResultBase } from "pg";


export async function deleteVacancy(id: number) {
	return client.query<IDeleteJobResult, DeleteJobParams>(sql`
		-- @name: deleteJob
		DELETE FROM jobs WHERE id = $1`, [id])
}

export async function addVacancy(body: InsertJob) {
	const values = Object.keys(body).map(key => body[key as keyof InsertJob]) as InsertJobParams;
	return client.query<IInsertJobResult, InsertJobParams>(sql`
		-- @name: insertJob
		INSERT INTO jobs (title, description, summary, salary) VALUES ($1, $2, $3, $4) RETURNING id`, values)
}

export async function updateVacancy(body: JobUpdate): Promise<QueryResultBase> {
	try {
		const data = body;
		const id: number = data.id;
		//@ts-ignore
		delete body.id

		let query: string = 'UPDATE jobs SET '

		const setClauses = Object
			.keys(body)
			.map((key, index) => {
				return `${key} = $${index + 1}`;
			});

		const values = Object.values(body);
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
