import type { FastifyRequest, RouteGenericInterface } from "fastify";

export interface Auth extends FastifyRequest {
	body: {
		login: string,
		password: string
	}
	/* headers: {
		'auth-userid-tg': string
	} */
}

export interface PInn extends FastifyRequest {
	params: {
		inn: string
	}
}

export interface FilterPF extends FastifyRequest {
	body: {}
}
