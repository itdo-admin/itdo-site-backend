import type { FastifyInstance } from "fastify";
import { authUser } from "../../controller/controller.auth.js";
import type { User } from "../../validation/admin";

//@ts-ignore
export default async function(fastify: FastifyInstance, opts) {
	fastify
		// .addHook('preHandler', auth)
		.post<{ Body: User }>('/auth', authUser)
		.get('/vacancy/', () => {
		})
		.get('/vacancy/:id(^\\d+)/info', () => {
		})
		.get('/projects/page/index', () => {
		})
		.get('/projects', () => {
		})
		.post('/request/write', () => {
		})
		.post('/request/vacancy', () => {
		})
}
