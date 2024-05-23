import { z } from 'zod';

const UserSchema = z.object({
	login: z.string(),
	password: z.string(),
});

export type User = z.infer<typeof UserSchema>;
