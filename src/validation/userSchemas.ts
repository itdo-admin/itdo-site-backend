import { z } from 'zod';

export const UserSchema = z.object({
	login: z.string().min(2, "Name is required"),
	password: z.string().min(2, "Password is min length 2"),
});

const JobsSchema = {
	title: z.string(),
	description: z.string(),
	summary: z.string(),
	salary: z.string()
}

export const getJobSchema = z.object({
	id: z.number(),
	...JobsSchema
}).nullable()

export const RequestWriteSchema = z.object({
	name: z.string(),
	type: z.enum(['Telegram', 'Whatsapp', 'Звонок', 'Email']),
	contact: z.string(),
	message: z.string(),
})

export const getJobsAllSchema = z.array(getJobSchema)

export const insertJobSchema = z.object(JobsSchema)
export const jobOptional = insertJobSchema.partial();
export const jobUpdate = jobOptional.merge(z.object({
	id: z.number()
}))

export const JobCreateSchema = z.object({
	id: z.number()
}).nullable()

export type InsertJob = z.infer<typeof insertJobSchema>
export type Job = z.infer<typeof getJobsAllSchema>;
export type JobOptional = z.infer<typeof jobOptional>
export type JobUpdate = z.infer<typeof jobUpdate>
export type RequestWriteType = z.infer<typeof RequestWriteSchema>
