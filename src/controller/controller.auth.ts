import { getHashPass } from "../model/auth.js";
import bcrypt from 'bcrypt'

// TODO забирать из данных пароль и логин
export async function authUser(login: string, password: string) {
	const salt = (await getHashPass(login)).rows[0].password
	return await bcrypt.compare(password, salt)
}
