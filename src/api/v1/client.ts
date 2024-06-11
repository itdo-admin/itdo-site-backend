import type { FastifyInstance } from "fastify";
import { authUser } from "../../controller/controller.auth.js";
import { ControllerVacancy } from "../../controller/controller.client.js"
import type { Auth, ReqVacancyId } from "../../controller/types";
import { createRouteSchema } from '../../utils/schemaUtils.js';
import { getJobsAllSchema, UserSchema } from "../../validation/userSchemas.js";

export default async function(fastify: FastifyInstance) {
	fastify
		.post<Auth>('/auth', {
			schema: createRouteSchema(UserSchema, ['auth']),
		}, authUser)
		.get<ReqVacancyId>('/vacancy/:id(^\\d+)/info', {
			schema: createRouteSchema(undefined, ['vacancy'], "Получение описания вакансии по id", getJobsAllSchema)
		}, ControllerVacancy.getId)
		.get('/vacancy', {
			schema: createRouteSchema(undefined, ['vacancy'], "Получение всех вакансий", getJobsAllSchema)
		}, ControllerVacancy.getAll)
		.get('/projects', () => {
			return "";
		})
		.post('/request/write', () => {
		})
		.post('/request/vacancy', () => {
		})
}
