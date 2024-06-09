import type { FastifyInstance } from "fastify";
import { authUser } from "../../controller/controller.auth.js";
import type { User } from "../../validation/admin";
import { ControllerVacancy } from "../../controller/controller.client.js"
import type {ReqVacancyId} from "../../controller/types";

export default async function(fastify: FastifyInstance) {
	fastify
		// .addHook('preHandler', auth)
		.post<{ Body: User }>('/auth', authUser)
		.get('/vacancy', ControllerVacancy.get)
		.get<ReqVacancyId>('/vacancy/:id(^\\d+)/info', ControllerVacancy.getId)
		.get('/projects/page/index', () => {
		})
		.get('/projects', () => {
		})
		.post('/request/write', () => {
		})
		.post('/request/vacancy', () => {
		})
}
