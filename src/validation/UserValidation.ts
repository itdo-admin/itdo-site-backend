import { UserSchema } from './userSchemas.js';
import type { User } from "./admin";

export function validateAuthUser(data: { login: string; password: string }) {
	const parseResult = UserSchema.safeParse(data);

	if (!parseResult.success) {
		console.log('parseResult.error.errors', parseResult.error.errors)
		throw new Error(parseResult.error.errors.map(e => e.message).join(", "));
	}
	return parseResult.data;
}
