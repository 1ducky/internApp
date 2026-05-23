import z from "zod";

export const submitPostSchema = z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    type: z.enum(["ANNOUNCEMENT", "EVENT", "DISCUSSION", "NEWS"]),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
    assets: z.array(z.string()).optional()
})

export type SubmitPostInput = z.infer<typeof submitPostSchema>