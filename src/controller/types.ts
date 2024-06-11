import type { FastifyRequest, RouteGenericInterface } from "fastify";
import type {InsertJob, Job, JobOptional} from "../validation/userSchemas";

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

export interface ReqJobGetAll extends RouteGenericInterface {}

export interface ReqVacancyId extends RouteGenericInterface {
	Params: {
		id: number
	}
}

export interface ReqVacancyUpdate extends RouteGenericInterface {
	Body: JobOptional
}

export interface ReqVacancyAdd extends RouteGenericInterface {
	Body: InsertJob,
}
