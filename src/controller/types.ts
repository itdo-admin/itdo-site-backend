import type { FastifyRequest, RouteGenericInterface } from "fastify";
import type { job as Job} from "../validation/userSchemas";

export interface Auth extends FastifyRequest {
	body: {
		login: string,
		password: string
	}
	/* headers: {
		'auth-userid-tg': string
	} */
}

export interface FilterPF extends FastifyRequest {
	body: {}
}

export interface ReqVacancyId extends RouteGenericInterface {
	Params: {
		id: number
	}
}

export interface ReqVacancyUpdate extends FastifyRequest {
	body: Job
}
