import Fastify, { type FastifyRequest, type RequestPayload } from 'fastify';
import cookie, { type FastifyCookieOptions } from '@fastify/cookie';
import session from '@fastify/session';

const fastify = Fastify({
	logger: true
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
		const responseData = { message: 'dada' };
		return responseData;
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
