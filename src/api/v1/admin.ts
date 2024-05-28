import type { FastifyInstance } from "fastify";
import { authenticateCookie } from "../service/auth.service.js";


export default async function(fastify: FastifyInstance) {
	fastify
		.addHook('preHandler', async (req, reply) => {
			const authHeader = req.cookies['x-auth'];
			console.log('req.cookies', req.cookies)
			console.log('authHeader', authHeader)
			if (!authHeader) {
				reply.code(401).send({ error: 'Unauthorized' });
				return;
			}

			const user = await authenticateCookie(authHeader);
			// console.log('testsss', user)
			if (!user?.token) {
				reply.code(403)
				reply.send({ error: 'Forbidden' })
			}

			// Добавляем пользователя в запрос для использования в обработчиках маршрутов
			// req.user = user;
		})
		// Project

		.get('/', (req, reply) => {
			return {

			}
		})
		.post('/project/add', () => {})
		.get(`/project/delete/:id(^\\d+)`, () => {})
		.post('/project/edit', () => {})
		// Jobs
		.post('/jobs/add', () => {})
		.post('/jobs/edit', () => {})
		.get(`/jobs/delete/:id(^\\d+)`, () => {})
}
