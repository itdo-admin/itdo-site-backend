import type { FastifyReply, FastifyRequest} from "fastify";
import {
	addVacancyService,
	deleteVacancyService,
	getVacancyIdService,
	getVacancyService,
	updateVacancyService
} from "../api/service/vacansy.service.js";
import type { ReqVacancyAdd, ReqVacancyId, ReqVacancyUpdate, ReqWriteMe } from "./types";
import { ErrorHttp } from "./error.js";
import { sendMailService } from "../api/service/sendMail.service.js";

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

	static async update(req: FastifyRequest<ReqVacancyUpdate>, reply: FastifyReply) {
		try {
			const updateData = req.body;
			const updated = await updateVacancyService(updateData);

			if(updated instanceof Error) {
				return reply
					.status(500)
					.send({ msg: updated.message });
			} else {
				return { updated: updated };
			}
		} catch (error) {
			ErrorHttp(error, reply)
		}
	}

	static async delete(req: FastifyRequest<ReqVacancyId>, reply: FastifyReply) {
		try {
			const id = req.params.id;
			const deleted = await deleteVacancyService(id);

			if (deleted instanceof Error) {
				reply
					.status(500)
				return {msg: deleted.message};
			}

			return deleted;
		} catch (error) {
			ErrorHttp(error, reply)
		}
	}

	static async add(req: FastifyRequest<ReqVacancyAdd>, reply: FastifyReply) {
		try {
			const data = req.body;
			const res = await addVacancyService(data);

			if (res instanceof Error) {
				reply
					.status(500)
				return {msg: res.message};
			}

			return res;
		} catch (error) {
			ErrorHttp(error, reply)
		}
	}
}

export class ControllerRequestWriteMe {
	static async request(req: FastifyRequest<ReqWriteMe>, reply: FastifyReply) {
		return await sendMailService(req.body);
	}
}
