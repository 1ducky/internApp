import { failed, ok } from "@/utils/responseMapper"
import { ProfileSchema } from "./profile.schema"
import { profileRepository } from "./profile.repository"
import { logger } from "@/infrastructure/lib/logger"

export const profileService = {
    SubmitProfile,
    getProfile
}

async function SubmitProfile(id:string,data:unknown) {
    logger.info("Profile submission request received", 'SubmitProfile')
    const validateInput = ProfileSchema.safeParse(data)
    if(!validateInput.success){
        logger.error("Profile validation failed", 'SubmitProfile')
        return failed(400,validateInput.error.flatten().fieldErrors,'Bad Request')
    }
    logger.info("Profile validation success", 'SubmitProfile')
    const res = await profileRepository.submitProfile(id,validateInput.data)
    if(!res.success){
        logger.error("Profile submission failed", 'SubmitProfile')
        return failed(500,'INTERNAL','internal')
    }
    logger.info("Profile submission success", 'SubmitProfile')
    return ok(res.data,'Submited')
}

async function getProfile(userId:string) {

    logger.info("Profile retrieval request received", 'getProfile')
    const res = await profileRepository.getProfileByUserId(userId)
    if(!res.success){
        logger.error("Profile retrieval failed", 'getProfile')
        return failed(500,'INTERNAL','internal')
    }
    logger.info("Profile retrieval success", 'getProfile')
    return ok(res.data,'Submited')
}