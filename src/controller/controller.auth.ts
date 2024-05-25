import bcrypt from 'bcrypt'
import crypto from 'crypto';
import type { FastifyReply } from "fastify";
import { getHashPass } from "../model/auth.js";
import type { Auth } from "./types";
import { validateAuthUser } from "../validation/UserValidation.js";
import * as repl from "node:repl";

export const storage = {} as { user: { token: string } }

function generateToken() {
	return crypto.randomBytes(16).toString('hex');
}

export function authenticate(token: string) {
	const user = Object.values(storage).find(user => user.token === token);
	console.log('user', storage, token)
	return user || null;
}

export async function authUser(req: Auth, reply: FastifyReply) {
	try {
		const minLengthHash = 0

		const validatedUser = validateAuthUser(req.body);
		const login = validatedUser.login
		const hash = await getHashPass(login)
		const checkResHash = hash.rows.length > minLengthHash;

		if(checkResHash) {
			const checkInPassword = await bcrypt.compare(validatedUser.password, hash.rows[0].password)

			if(checkInPassword) {
				const token = generateToken()
				console.log('generateToken', token)

				reply
					.setCookie('x-auth', token)

				// @ts-ignore
				storage['login'] = { 'user': login, token: token };


				// reply.send({ body: 'hello world' })
				reply.redirect('/api/v1/admin/')
			}

			console.log('password in correct')
			return 'Login or password is not correct'
		}

		console.log('Login not found')
		return 'Login or password is not correct'
	} catch (error) {
		console.log(error)
		reply.status(400);

		if(error instanceof Error) {
			return { error: error.message };
		}
	}
}
