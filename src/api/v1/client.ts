import type { FastifyInstance } from "fastify";
import { authUser } from "../../controller/controller.auth.js";
import type { User } from "../../validation/admin";
import { ControllerVacancy } from "../../controller/controller.client.js"
import type {Auth, ReqVacancyId} from "../../controller/types";

export default async function(fastify: FastifyInstance) {
	fastify
		// .addHook('preHandler', auth)
		.post<Auth>('/auth', authUser)
		.get('/vacancy', ControllerVacancy.get)
		.get<ReqVacancyId>('/vacancy/:id(^\\d+)/info', ControllerVacancy.getId)
		// index???
		.get('/projects/page/index', () => {
		})
		.get('/projects', () => {
		})
		.post('/request/write', () => {
		})
		.post('/request/vacancy', () => {
		})
}
