import { sql } from "sqlx-ts"
import client from "./main.js"
import type { IGetVacancyAllQuery, IGetVacancyAllResult } from "./types";
import { type job } from "../validation/userSchemas.js";

export async function getVacancyAll(){
	try {
		return await client.query<IGetVacancyAllResult, IGetVacancyAllQuery>(sql`
			-- @name: getVacancyAll
			SELECT * FROM jobs;`)
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function getVacancyId(id: number) {
	try {
		return await client.query(sql`
			-- @name: getVacancyId
			SELECT * FROM jobs WHERE id = $1 LIMIT 1;
		`, [id])
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function updateVacancy(body: job, test = false) {
	try {
		let query = 'UPDATE jobs SET '

		const setClauses = Object.keys(body).map(key => {
			const value = body[key as keyof job]
			const formattedValue = typeof value === 'string' ? `'${value}'` : value;
			return `${key} = ${formattedValue}`;
		})

		query += setClauses.join(', ');
		//@ts-ignore
		return test && await client.query(sql`${query}`, []) || query
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function deleteVacancy(id: number) {
	return client.query(sql`
		-- @name: deleteJob
		DELETE FROM jobs WHERE id = $1`, [id])
}

export async function addVacancy(body: job) {
	return client.query(sql`
		-- @name: insertJob
		INSERT INTO jobs (title, description, summary, photo, salary) VALUES ($1, $2, $3, $4, $5)`, [])
}
