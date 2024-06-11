import type {RouteShorthandOptions} from 'fastify';
import fromZodSchema from 'zod-to-json-schema';
import { ZodSchema } from 'zod';

export const createRouteSchema = (bodySchema?: ZodSchema<any>, tags?: string[], description?: string, responseSchema?: ZodSchema<any>) => {
	const schema: RouteShorthandOptions['schema'] = {};

	if (tags) {
		schema.tags = tags;
	}

	if (description) {
		schema.description = description;
	}

	if (bodySchema) {
		schema.body = fromZodSchema(bodySchema);
	}

	if (responseSchema) {
		schema.response = {
			200: fromZodSchema(responseSchema),
		};
	}

	return schema;
};
