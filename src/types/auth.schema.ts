import { z } from "astro/zod";


export const userSchema = z.object({
    id:z.number(),
    name: z.string(),
    role:z.string()
})