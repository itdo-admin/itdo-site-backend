import crypto from "crypto";
import bcrypt from "bcrypt";
import {getHashPass} from "../../model/auth.js";
import type {AuthUserBody} from "../types";

export const storage = {} as { user: { token: string } }

export async function generateToken() {
	return crypto.randomBytes(16).toString('hex');
}

export async function authenticateCookie(token: string) {
	const user = Object.values(storage).find(user => user.token === token);
	console.log('user', storage, token)
	return user || null;
}

export async function auth(validatedUser: AuthUserBody) {
	const minLengthHash = 0
	const login = validatedUser.login
	const hash = await getHashPass(login)
	const checkResHash = hash.rows.length > minLengthHash;

	if(checkResHash) {
		const checkInPassword = await bcrypt.compare(validatedUser.password, hash.rows[0].password)

		if (checkInPassword) {
			const token = await generateToken()
			storage['user'] = {token: token};

			return {
				status: true,
				token: token
			}
		}

		return new Error('Password is not correct');
	} else {
		return new Error('Login is not correct');
	}
}
