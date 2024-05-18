import { sql } from "sqlx-ts"
import client from "./main.js"
import type {
	GetSaltParams, IGetSaltResult
} from './types';

export async function getHashPass(login: string) {
	try {
		return await client.query<IGetSaltResult, GetSaltParams>(sql`
			-- @name: getSalt
			SELECT password FROM users WHERE login = $1 LIMIT 1;`, [login])
	} catch (e) {
		console.log(e);
		throw e;
	}
}
