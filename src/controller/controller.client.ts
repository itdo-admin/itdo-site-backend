import type { FastifyReply, FastifyRequest} from "fastify";
import { getVacancyService } from "../api/service/vacansy.service.js";

export async function getVacancy(req: FastifyRequest, reply: FastifyReply) {
	try {
		const vc = await getVacancyService()

		if(vc instanceof Error) {
			reply
				.status(500)
				.send({ msg: vc.message });
		} else {
			return vc;
		}
	} catch (error) {
		console.log(error)
		reply.status(500);

		if(error instanceof Error) {
			return { error: error.message };
		}
	}
}

export async function
