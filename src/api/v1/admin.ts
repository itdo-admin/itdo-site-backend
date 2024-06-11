import type { FastifyInstance } from "fastify";
import { authenticateCookie } from "../service/auth.service.js";
import { ControllerVacancy } from "../../controller/controller.client.js";
import type {ReqVacancyAdd, ReqVacancyId, ReqVacancyUpdate} from "../../controller/types";

export default async function(fastify: FastifyInstance) {
	fastify
		.addHook('preHandler', async (req, reply) => {
			const authHeader = req.cookies['x-auth'];
			console.log('req.cookies', req.cookies)
			console.log('authHeader', authHeader)
			if (!authHeader) {
				reply
					.code(401)

				return { error: 'Unauthorized' }
			}

			const user = await authenticateCookie(authHeader);

			console.log(user)
			if (!user?.token) {
				reply.code(403)
				reply.send({ error: 'Forbidden' })
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
