import type { FastifyInstance } from "fastify";

//@ts-ignore
export default async function(fastify: FastifyInstance, opts) {
	fastify
		// .addHook('preHandler', auth)
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
