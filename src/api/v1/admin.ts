import type { FastifyInstance } from "fastify";
import { authenticateCookie } from "../service/auth.service.js";
import { ControllerVacancy } from "../../controller/controller.client.js";
import type { ReqVacancyAdd, ReqVacancyId, ReqVacancyUpdate } from "../../controller/types";
import { createRouteSchema } from "../../utils/schemaUtils.js";
import { insertJobSchema, JobCreateSchema, jobUpdate } from "../../validation/userSchemas.js";

export default async function(fastify: FastifyInstance) {
	fastify
		.addHook('preHandler', async (req, reply) => {
			console.log('req.headers', req.headers)
			const authHeader = req.cookies['x-auth'];

			if (!authHeader) {
				return reply
					.code(401)
					.send({ error: 'Unauthorized' })
			}

			const user = await authenticateCookie(authHeader);

			console.log('user', user)
			if (!user?.token) {
				return reply
					.code(403)
					.send({ error: 'Forbidden' })
			}
		})
		.get('/check', async() => {
			return {
				checkIn: true
			}
		})
		.post('/project/add', () => {})
		.get(`/project/delete/:id(^\\d+)`, () => {})
		.post('/project/update', () => {})
		// Jobs
		.post<ReqVacancyAdd>('/jobs/add', {
			schema: createRouteSchema({
				tags: ['jobs', 'admin'],
				description: "Добавление новой вакансии на сайт",
				bodySchema: insertJobSchema,
				responseSchema: JobCreateSchema,
			})
		}, ControllerVacancy.add)
		.get<ReqVacancyId>(`/jobs/delete/:id(^\\d+)`, {
			schema: createRouteSchema({
				tags: ['jobs', 'admin'],
				description: "Удаление вакансии по id",
				properties: {
					id: {
						type: "number"
					}
				}
			})
		}, ControllerVacancy.delete)
		.post<ReqVacancyUpdate>('/jobs/update/:id(^\\d+)', {
			schema: createRouteSchema({
				tags: ['jobs', 'admin'],
				description: "Обновление вакансии",
				properties: {
					id: {
						type: "number",
					},
				},
				bodySchema: jobUpdate,
			})
		}, ControllerVacancy.update);
}
