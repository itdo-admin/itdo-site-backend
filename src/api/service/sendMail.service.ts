import nodemailer from 'nodemailer';
import type { RequestWriteType } from "../../validation/userSchemas";

const transporter = nodemailer.createTransport({
	host: "smtp.jino.ru",
	port: 587,
	secure: false, // Use `true` for port 465, `false` for all other ports
	auth: {
		user: "info@it-do.pro",
		pass: "!4a}F9/87}%{",
	},
});

export async function sendMailService(body: RequestWriteType) {
	if(body.type === 'Email') {
		const mail = await transporter.sendMail({
			from: '"it-do" <info@it-do.pro>',
			to: body.contact,
			subject: 'Автоматическое письмо',
			text: `Здравствуйте, ${body.name}. Мы получили ваше сообщение и в ближайшее время ответим вам!`
		})

		console.log(mail)
	}

	const mail = await transporter.sendMail({
		from: '"it-do" <info@it-do.pro>',
		to: "leonardo5878@yandex.ru",
		subject: 'Новое сообщение на сайте',
		text: `Имя: ${body.name}\n${body.type === 'Звонок' ? "Номер" : body.contact }: ${body.contact}\nСообщение: ${body.message}`
	})

	console.log(mail)

	return {
		msg: 'ok'
	}
}

