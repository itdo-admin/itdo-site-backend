import { z } from "zod";
import { UserSchema } from "../validation/userSchemas.js";

export type AuthUserBody = z.infer<typeof UserSchema>
