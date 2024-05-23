import type { FastifyInstance } from "fastify";
import {authenticate} from "../../controller/controller.auth.js";


export default async function(fastify: FastifyInstance) {
	fastify
		.addHook('preHandler', async (req, reply) => {
			const authHeader = req.cookies.test;
			console.log('req.cookies', req.cookies)
			console.log('authHeader', authHeader)
			if (!authHeader) {
				reply.code(401).send({ error: 'Unauthorized' });
				return;
			}

			// const token = authHeader.split(' ')[1];
			const cookieValue = req.unsignCookie(req.cookies.test);
			if (cookieValue.valid) {
				const user = authenticate(cookieValue.value);
				console.log('testsss', user)
				if (!user) {
					reply.code(403)
					reply.send({error: 'Forbidden'})
				}
			}

			// Добавляем пользователя в запрос для использования в обработчиках маршрутов
			// req.user = user;
		})
		// Project

		.get('/', (req, reply) => {
			reply.send('test')
		})
		.post('/project/add', () => {})
		.get(`/project/delete/:id(^\\d+)`, () => {})
		.post('/project/edit', () => {})
		// Jobs
		.post('/jobs/add', () => {})
		.post('/jobs/edit', () => {})
		.get(`/jobs/delete/:id(^\\d+)`, () => {})
}
