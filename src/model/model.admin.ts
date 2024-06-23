import client from "./main.js";
import type { DeleteJobParams, IDeleteJobResult, IInsertJobResult, InsertJobParams } from "./types";
import { sql } from "sqlx-ts";
import type { InsertJob, JobOptional } from "../validation/userSchemas";
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

export async function updateVacancy(body: JobOptional): Promise<QueryResultBase> {
	try {
		let query: string = 'UPDATE jobs SET '

		const setClauses = Object.keys(body).map((key, index) => {
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
