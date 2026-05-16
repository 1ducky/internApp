import z from "zod";


const GenderSchema = z.enum(["GIRL","BOY"])


export const ProfileSchema = z.object({
    birthDate:z.string().nullish(),
    bio:z.string().nullish(),
    userName:z.string().nullish(),
    gender:GenderSchema,
    phoneNumber:z.string().nullish(),
    location:z.string().nullish()
})

export type ProfileInput = z.infer<typeof ProfileSchema>