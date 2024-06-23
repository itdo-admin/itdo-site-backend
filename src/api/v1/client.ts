import type { FastifyInstance } from "fastify";
import { authUser } from "../../controller/controller.auth.js";
import {ControllerRequestWriteMe, ControllerVacancy} from "../../controller/controller.client.js"
import type { Auth, ReqVacancyId } from "../../controller/types";
import { createRouteSchema } from '../../utils/schemaUtils.js';
import {
	getJobsAllSchema,
	getJobSchema,
	RequestWriteSchema,
	UserSchema
} from "../../validation/userSchemas.js";

export default async function(fastify: FastifyInstance) {
	fastify
		.post<Auth>('/auth', {
			schema: createRouteSchema({
				tags: ['auth'],
				bodySchema: UserSchema
			})
		}, authUser)
		.get<ReqVacancyId>('/vacancy/:id(^\\d+)', {
			schema: createRouteSchema({
				tags: ['vacancy'],
				properties: {
					id: { type: 'number' },
				},
				responseSchema: getJobSchema
			})
		}, ControllerVacancy.getId)
		.get('/vacancy', {
			schema: createRouteSchema({
				tags: ['vacancy'],
				description: "Получение всех вакансий",
				responseSchema: getJobsAllSchema
			})
		}, ControllerVacancy.getAll)
		.get('/projects', () => {
			return "";
		})
		.post('/request/writeme', {
			schema: createRouteSchema({
				tags: ['request'],
				description: "Отправка сообщения пользователем на сайте",
				bodySchema: RequestWriteSchema
			})
		}, ControllerRequestWriteMe.request)
		.post('/request/vacancy', () => {
		})
}
