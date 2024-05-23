import { z } from 'zod';

export const UserSchema = z.object({
	login: z.string().min(2, "Name is required"),
	password: z.string().min(2, "Password is min length 2"),
});

export type User = z.infer<typeof UserSchema>;
