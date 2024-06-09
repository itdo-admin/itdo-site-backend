import type { FastifyReply } from "fastify";

export function ErrorHttp(error: unknown, reply: FastifyReply) {
	console.log(error)
	reply.status(500);

	if(error instanceof Error) {
		return { error: error.message };
	}

	return 'error'
}
