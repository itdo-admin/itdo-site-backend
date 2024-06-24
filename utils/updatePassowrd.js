import bcrypt from "bcrypt";
import client from "../out/model/main.js"

export async function checkAuthUser(login, passwordUser){
    try {
        const salt = await bcrypt.genSalt(12);
        const password = await bcrypt.hash(passwordUser, salt)

        return await client.query(`UPDATE users SET password = $1 WHERE login = $2`, [password, login]);
    } catch (e) {
        console.log(e);
    }
}

checkAuthUser('Ruslan', 'newPassword').then(r => console.log(r.rowCount === 1 && 'Пароль успешно обновлен' || 'Ошибка!'))
