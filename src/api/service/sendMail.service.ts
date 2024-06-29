import nodemailer from 'nodemailer';
import { type RequestWriteType } from "../../validation/userSchemas.js";
import {ErrorHttp} from "../../controller/error";

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
	try {
		if (body.type === 'Email') {
			const mail = await transporter.sendMail({
				from: '"it-do" <info@it-do.pro>',
				to: body.contact,
				subject: 'Автоматическое письмо',
				text: `Здравствуйте, ${body.name}. Мы получили ваше сообщение и в ближайшее время ответим вам!`
			})

			console.log(mail)
		}

		const contact = await typeInteractive(body.type, body.contact, body.name);
		console.log('contact', contact)
		let message = "Сообщение:<br>" + body.message
		message = message.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>');

		console.log('message', message)

		const mail = await transporter.sendMail({
			from: '"it-do" <info@it-do.pro>',
			to: "leonardo5878@yandex.ru",
			subject: `Новое сообщение на сайте от ${body.name}`,
			html: `<b>Имя:</b> ${body.name}<br>${body.type === 'Call' ? "Номер" : body.type}: ${contact}<br><br>${message}`
		})

		console.log(mail)

		return {
			msg: 'ok'
		}
	} catch (e) {
		console.log(e);

		if (e instanceof Error) {
			return {
				msg: e.message
			}
		}

		return {
			msg: 'failed',
		}
	}
}

async function typeInteractive(type: RequestWriteType['type'], contact: string, name: string) {
	switch (type) {
		case 'Telegram' :
			return `<a href="https://t.me/${contact.replace('@', '')}">${contact}</a>`;
		case 'Email' :
			return `<a href="mailto:${contact}">${contact}</a>`;
		case 'Call' :
			return `<a href=tel:${contact}">${contact}</a>`;
		case 'WhatsApp' :
			console.log('WhatsApp')
			return `<a href="https://wa.me/${contact}?text=Здравствуйте, ${name}.">${contact}</a>`
	}
}
