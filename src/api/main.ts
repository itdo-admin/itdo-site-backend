import Fastify, { type FastifyRequest, type RequestPayload } from 'fastify';
import cookie, { type FastifyCookieOptions } from '@fastify/cookie';
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

const fastify = Fastify({
	logger: true
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
	staticCSP: true,
	transformSpecification: (swaggerObject, request, reply) => {
		return swaggerObject;
	},
	transformSpecificationClone: true,
})

fastify.register(async (app) => {
	await app
		.register(import('./v1/admin.js'), { prefix: '/admin' })
		.register(import('./v1/client.js'), { prefix: '/client' })
}, { prefix: '/api/v1' });

fastify.setErrorHandler((error, req, reply) => {
	fastify.log.error(error);
	reply.status(500).send({ error: 'Something went wrong' });
});

// Модифицирует ответ до сериализации, добавляя ответ в объект
fastify.addHook('preSerialization', (request: FastifyRequest, reply, payload: RequestPayload, done) => {
	if('openapi' in payload) {
		return done(null, payload)
	}

	const result = {
		status: true,
		body: payload
	}

	if (payload && 'message' in payload) {
		return done(null, payload);
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
		throw new Error('efowkef');
	})

// Run the server!
try {
	await fastify.listen({ host: '0.0.0.0', port: 8080 })
} catch (err) {
	fastify.log.error(err)
	process.exit(1)
}
