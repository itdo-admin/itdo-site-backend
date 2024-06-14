import type {RouteShorthandOptions} from 'fastify';
import fromZodSchema from 'zod-to-json-schema';
import { wrapSchemaInBaseResponse } from "../validation/customResponse.js";

interface RouteSchema {
	properties?: any
	querystring?: string
	bodySchema?: any;
	tags?: string[];
	description?: string;
	responseSchema?: any;
	header?: string
}

export const createRouteSchema = ({ bodySchema, tags, description, responseSchema, properties }: RouteSchema) => {
	const schema: RouteShorthandOptions['schema'] = {};

	if(properties) {
		schema.params = {
			type: "object",
			properties,
		};
	}

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
			200: fromZodSchema(wrapSchemaInBaseResponse(responseSchema)),
		};
	}

	return schema;
};
