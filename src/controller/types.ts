import type { FastifyRequest, RouteGenericInterface } from "fastify";
import type {InsertJob, Job, JobOptional, JobUpdate, RequestWriteType} from "../validation/userSchemas";
import type { AuthUserBody } from "../api/types";

export interface Auth extends RouteGenericInterface {
	Body: AuthUserBody
}

export interface ReqJobGetAll extends RouteGenericInterface {}

export interface ReqVacancyId extends RouteGenericInterface {
	Params: {
		id: number
	}
}

export interface ReqVacancyUpdate extends RouteGenericInterface {
	Params: {
		id: number
	},
	Body: JobUpdate
}

export interface ReqVacancyAdd extends RouteGenericInterface {
	Body: InsertJob,
}

export interface ReqWriteMe extends RouteGenericInterface {
	Body: RequestWriteType
}
