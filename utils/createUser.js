import bcrypt from "bcrypt";
import client from "../out/model/main.js"

export async function checkAuthUser(login, passwordUser){
    try {
        const salt = await bcrypt.genSalt(12);
        const password = await bcrypt.hash(passwordUser, salt)

        return await client.query(`INSERT INTO users (login, password, role) VALUES ($1, $2, $3)`,
            [login, password, 1])
    } catch (e) {
        console.log(e);
        throw e;
    }
}

checkAuthUser('Ruslan', 'datadadwq').then(r => console.log(r.rowCount === 1 && 'Пользователь успешно создан' || 'Ошибка!'))
