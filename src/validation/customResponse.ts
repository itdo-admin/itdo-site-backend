import { z } from "zod";

const baseResponseSchema = z.object({
	status: z.boolean(),
	body: z.any(), // Используйте z.any(), чтобы позволить любому типу данных быть в body
});

export const wrapSchemaInBaseResponse = (schema: z.ZodTypeAny) => {
	return baseResponseSchema.extend({
		body: schema
	});
};
