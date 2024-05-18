import type { FastifyInstance } from "fastify";
// import { CreateOrganization } from "../../../types/main.js";

//@ts-ignore
export default async function(fastify: FastifyInstance, opts) {
	fastify
		.addHook('preHandler', () => {})
		// Project

		.post('/project/add', () => {})
		.get(`/project/delete/:id(^\\d+)`, () => {})
		.post('/project/edit', () => {})
		// Jobs
		.post('/jobs/add', () => {})
		.post('/jobs/edit', () => {})
		.get(`/jobs/delete/:id(^\\d+)`, () => {})
}
