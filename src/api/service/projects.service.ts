import { getProjectsAllFull, getProjectsAllShort } from "../../model/model.client.js";

export async function getProjectsAllShortService() {
	try {
		const proj = await getProjectsAllShort();
		// TODO сделать проверку, что вообще что-то есть.
		return proj.rows;
	} catch (e) {
		console.log(e);
		return new Error('Error getProjectsAllShortService')
	}
}

export async function getProjectsAllFullService() {
	try {
		const proj = await getProjectsAllFull();
		// TODO сделать проверку, что вообще что-то есть.
		return proj.rows;
	} catch (e) {
		console.log(e);
		return new Error('Error getProjectsAllShortService')
	}
}
