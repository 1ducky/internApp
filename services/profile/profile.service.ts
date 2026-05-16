import { failed, ok } from "@/utils/responseMapper"
import { ProfileSchema } from "./profile.schema"
import { profileRepository } from "./profile.repository"

export const profileService = {
    SubmitProfile,
    getProfile
}

async function SubmitProfile(id:string,data:unknown) {
    const validateInput = ProfileSchema.safeParse(data)
    if(!validateInput.success){
        return failed(400,validateInput.error.flatten().fieldErrors,'Bad Request')
    }
    const res = await profileRepository.submitProfile(id,validateInput.data)
    if(!res.success){
        return failed(500,'INTERNAL','internal')
    }
    return ok(res.data,'Submited')
}

async function getProfile(id:string) {
    const res = await profileRepository.getProfileByUserId(id)
    if(!res.success){
        return failed(500,'INTERNAL','internal')
    }
    return ok(res.data,'Submited')
}