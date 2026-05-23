import z from "zod";

const ObjType = z.enum(["IMAGE", "DOCUMENT", "OTHER"])
export const objSchema = z.object({
    fileUrl: z.string(),
    fileSize: z.int(),
    mimeType: z.string(),
    fileName: z.string(),
    fileKey: z.string(),
    authorId: z.string()
})

export const ObjDetailSchema = z.object({
    id: z.string(),
    fileUrl: z.string(),
    fileSize: z.int(),
    fileMime: z.string(),
    fileName: z.string(),
    fileKey: z.string(),
    fileType: ObjType,
    authorId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export type ObjInput = z.infer<typeof objSchema>
export type ObjType = z.infer<typeof ObjType>