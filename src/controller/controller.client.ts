import type { FastifyReply, FastifyRequest} from "fastify";
import {
	addVacancyService,
	deleteVacancyService,
	getVacancyIdService,
	getVacancyService,
	updateVacancyService
} from "../api/service/vacansy.service.js";
import type {ReqVacancyAdd, ReqVacancyId, ReqVacancyUpdate} from "./types";
import { ErrorHttp } from "./error.js";

export abstract class ControllerVacancy {
	static async getAll(req: FastifyRequest, reply: FastifyReply) {
		try {
			const vc = await getVacancyService()

			if(vc instanceof Error) {
				reply
					.status(500)
				return { msg: vc.message };
			}

			return vc;
		} catch (error) {
			ErrorHttp(error, reply)
		}
	}

	static async getId(req: FastifyRequest<ReqVacancyId>, reply: FastifyReply) {
		try {
			const vacancyId = req.params.id;

			// TODO добавить валидацию
			if(vacancyId !== undefined) {
				const vcs = await getVacancyIdService(vacancyId);

				if(vcs instanceof Error) {
					reply
						.status(500)
						.send({ msg: vcs.message });
				} else {
					return vcs;
				}
			} else {
				reply.status(500);
			}
		} catch (error) {
			ErrorHttp(error, reply)
		}
	}

	static async update(req: FastifyRequest<ReqVacancyUpdate>, reply: FastifyReply): Promise<boolean | void> {
		try {
			const updateData = req.body;
			const vcs = await updateVacancyService(updateData);

			if(vcs instanceof Error) {
				reply
					.status(500)
					.send({ msg: vcs.message });
			} else {
				return vcs;
			}
		} catch (error) {
			ErrorHttp(error, reply)
		}
	}

	static async delete(req: FastifyRequest<ReqVacancyId>, reply: FastifyReply) {
		const id = req.params.id;
		const deleted = await deleteVacancyService(id);

		if(deleted instanceof Error) {
			reply
				.status(500)
			return { msg: deleted.message };
		}

		return deleted;
	}

	static async add(req: FastifyRequest<ReqVacancyAdd>, reply: FastifyReply) {
		const data = req.body;
		// TODO check validation
		const res = await addVacancyService(data);

		if(res instanceof Error) {
			reply
				.status(500)
				.send({ msg: res.message });
		} else {
			return res;
		}
	}
}
