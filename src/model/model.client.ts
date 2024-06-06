import { sql } from "sqlx-ts"
import client from "./main.js"
import type {IGetVacancyAllQuery, IGetVacancyAllResult} from "./types";

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
