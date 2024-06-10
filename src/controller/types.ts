import type { FastifyRequest, RouteGenericInterface } from "fastify";
import type {job as Job, InsertJob} from "../validation/userSchemas";

export interface Auth extends RouteGenericInterface {
	Body: {
		login: string,
		password: string
	}
	/* headers: {
		'auth-userid-tg': string
	} */
}

export interface FilterPF extends FastifyRequest {
	Body: {}
}

export interface ReqVacancyId extends RouteGenericInterface {
	Params: {
		id: number
	}
}

export interface ReqVacancyUpdate extends RouteGenericInterface {
	Body: Job
}

export interface ReqVacancyAdd extends RouteGenericInterface {
	Body: InsertJob,
}
