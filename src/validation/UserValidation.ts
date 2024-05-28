import { UserSchema } from './userSchemas.js';
import type { AuthUserBody } from "../api/types";

export function validateAuthUser(data: AuthUserBody) {
	const parseResult = UserSchema.safeParse(data);

	if (!parseResult.success) {
		console.log('parseResult.error.errors', parseResult.error.errors)
		throw new Error(parseResult.error.message);
	}
	return parseResult.data;
}
