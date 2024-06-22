import type { FastifyInstance } from "fastify";
import { authenticateCookie } from "../service/auth.service.js";
import { ControllerVacancy } from "../../controller/controller.client.js";
import type {ReqVacancyAdd, ReqVacancyId, ReqVacancyUpdate} from "../../controller/types";

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
		.post('/project/edit', () => {})
		.post('/project/update', () => {})
		// Jobs
		.post<ReqVacancyAdd>('/jobs/add', ControllerVacancy.add)
		.get<ReqVacancyId>(`/jobs/delete/:id(^\\d+)`, ControllerVacancy.delete)
		.post<ReqVacancyUpdate>('/jobs/update', ControllerVacancy.update);
}
