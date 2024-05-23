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
	secret: "ead55c2fd4beca20321647515d75150b4e3fcd8de9892b6ae2d5853201dbc60e", // for cookies signature
	hook: 'onRequest', // set too false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
	parseOptions: {
		httpOnly: false,
	}  // options for parsing cookies
} as FastifyCookieOptions)

// fastify.register(session, {
// 	secret: 'fa169a901b7b1e79fe7cff33ccf7edbbd2f9fc2e06482ef520f3ea3de96ace77',
// 	cookie: { secure: false } // Установите secure: true для HTTPS
// });

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
