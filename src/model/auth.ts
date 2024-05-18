import { sql } from "sqlx-ts"
import client from "./main.js"
import type { AuthenticationParams, IAuthenticationQuery } from './types';
import type { QueryResult } from "pg";

export async function checkAuthUser(login: string, password: string): Promise<QueryResult<IAuthenticationQuery>> {
	try {
		return await client.query<IAuthenticationQuery, AuthenticationParams>(sql`
			-- @name: authentication
			SELECT count(id) as result FROM users WHERE login = $1 AND password = $2;`, [login, password]);
	} catch (e) {
		console.log(e);
		throw e;
	}
}
