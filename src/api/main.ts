import Fastify, { type FastifyRequest, type RequestPayload } from 'fastify';
import cookie, { type FastifyCookieOptions } from '@fastify/cookie';
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import cors from '@fastify/cors'

const fastify = Fastify({
	logger: {
		transport: {
			target: 'pino-pretty',
			options: {
				colorize: true, // использовать цвета для лучшей читаемости
				translateTime: true, // переводить timestamp в читаемый формат
				ignore: 'pid,hostname', // игнорировать некоторые поля
			}
		}
	}
})

await fastify.register(cors, {
	origin: true, // Разрешить все источники
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Разрешить все методы
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'x-auth'], // Разрешить все заголовки
	credentials: true, // Разрешить отправку cookie
	preflight: true,
})

await fastify.register(swagger, {
	mode: 'dynamic',
	openapi: {
		openapi: "3.0.1",
		info: {
			title: 'API Documentation',
			description: 'API Documentation for my Fastify project',
			version: '1.0.0',
		},
		servers: [
			{
				url: '/',
				description: "localhost"
			},
		],
	},
})

await fastify.register(swaggerUi, {
	routePrefix: '/docs',
	uiConfig: {
		docExpansion: 'full',
		deepLinking: true,
	},
	staticCSP: false,
	transformSpecification: (swaggerObject, request, reply) => {
		return swaggerObject;
	},
	transformSpecificationClone: true,
})

fastify.register(async (app) => {
	await app
		.register(import('./v1/admin.js'), { prefix: '/admin' })
		.register(import('./v1/client.js'), { prefix: '/' })
}, { prefix: '/api/v1' });

fastify.setErrorHandler((error, req, reply) => {
	fastify.log.error(error);
	reply.status(500).send({ error: error.message });
});

// Модифицирует ответ до сериализации, добавляя ответ в объект
fastify.addHook('preSerialization', (request: FastifyRequest, reply, payload: RequestPayload, done) => {
	if (payload && 'openapi' in payload) {
		return done(null, payload)
	}

	const result = {
		status: true,
		body: payload
	}

	if (payload && 'message' in payload) {
		return done(null, payload);
	}

	if (payload && 'error' in payload) {
		return done(null, {
			status: false,
			body: payload
		})
	}

	return done(null, result);
});

fastify.register(cookie, {
	hook: 'onRequest',
	cookie: { secure: false },
	parseOptions: {
	// 	httpOnly: false,
		path: '/'
	}
} as FastifyCookieOptions)

fastify
	.get('/', async function (req: FastifyRequest, reply) {
		return { message: 'dada' };
	})
	.get('/error', function (req, reply) {
		throw new Error('Example error');
	})

// Run the server!
try {
	await fastify.listen({ host: '0.0.0.0', port: 8080 })
} catch (err) {
	fastify.log.error(err)
	process.exit(1)
}
