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
import axios from "axios";

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
	static async request({ body }: FastifyRequest<ReqWriteMe>, reply: FastifyReply) {
		if (await checkRecaptcha(body.recaptchaResponse, reply)) {
			reply.code(200);
			return await sendMailService(body);
		}
	}
}

async function checkRecaptcha(key: string, reply: FastifyReply) {
	try {
		const resKey = key;
		const secreteKey: string = "6Ledsf8pAAAAAM8WbA7C4rrAC5EDdXgyoukinDTU";

		const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secreteKey}&response=${resKey}`;

		const { success } = (await axios.post(url)).data

		if (!success) {
			return reply
				.code(400)
				.send({error: 'Invalid reCAPTCHA'});
		}

		return true;
	} catch (error) {
		return reply.code(500).send({error: 'Internal Server Error'});
	}
}
