import type {FastifyReply, FastifyRequest} from "fastify";
import type { Auth } from "./types";
import { validateAuthUser } from "../validation/UserValidation.js";
import { auth } from "../api/service/auth.service.js";

export async function authUser(req: FastifyRequest<Auth>, reply: FastifyReply) {
	try {
		const validatedUser = validateAuthUser(req.body);
		const authUser = await auth(validatedUser)

		if(authUser instanceof Error) {
			reply
				.status(401)
				.send({ msg: authUser.message });
		} else {
			reply
				.setCookie('x-auth', authUser.token)
				.redirect('/api/v1/admin/check');
		}
	} catch (error) {
		console.log(error)
		reply.status(400);

		if(error instanceof Error) {
			return { error: error.message };
		}
	}
}
