import z from "zod";


const GenderSchema = z.enum(["GIRL","BOY"])

export const ProfileSubmitSchema = z.object({
    userId:z.string(),
    birthDate:z.string().nullish(),
    bio:z.string().nullish(),
    gender:GenderSchema,
    phoneNumber:z.string().nullish(),
    location:z.string().nullish()
})

export type ProfileSubmitInput = z.infer<typeof ProfileSubmitSchema>