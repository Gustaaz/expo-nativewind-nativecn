import { z } from "zod";
import { signInSchema } from "@/schemas/signIn-schema";

export type User = z.infer<typeof signInSchema>