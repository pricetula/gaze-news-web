import { z } from "zod"

export const requestNewsSchema = z.object({
    keyword: z
        .string()
        .min(1, { message: "keyword is required" }),
})

export type RequestNewsSchema = z.infer<typeof requestNewsSchema>