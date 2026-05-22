import z from "zod";

export const submitPostSchema = z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    imageUrl: z.string().optional(),
    type: z.enum(["ANNOUNCEMENT", "EVENT", "DISCUSSION", "NEWS"]),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
})

export const PostSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    imageUrl: z.string().nullable(),
    type: z.string(),
    status: z.string(),
    slug: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})
export const RawPostSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    imageUrl: z.string().nullable(),
    type: z.string(),
    status: z.string(),
    slug: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type RawPostInput = z.infer<typeof RawPostSchema>
export type PostInput = z.infer<typeof PostSchema>
export type SubmitPostInput = z.infer<typeof submitPostSchema>