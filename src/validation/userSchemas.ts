import { z } from 'zod';

export const UserSchema = z.object({
	login: z.string().min(2, "Name is required"),
	password: z.string().min(2, "Password is min length 2"),
});

const JobsSchema = {
	title: z.string(),
	description: z.string(),
	summary: z.string(),
	photo: z.string(),
	salary: z.string()
}

export const getJobsAllSchema = z.object({
	id: z.number(),
	...JobsSchema
})

export const insertJobSchema = z.object(JobsSchema)

export type InsertJob = z.infer<typeof insertJobSchema>
export type job = z.infer<typeof getJobsAllSchema>;
export type User = z.infer<typeof UserSchema>;
