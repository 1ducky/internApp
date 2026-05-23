import { logger } from "@/infrastructure/lib/logger"
import { objSchema } from "./obj.schema"
import { objrepository } from "./obj.repository"
import { failed } from "@/utils/responseMapper"

export const objectStorageService = {
    uploadFileImage
}

async function uploadFileImage(metadata: unknown) {
    const validated = objSchema.safeParse(metadata)
    if(!validated.success){
        logger.error(`File upload request is invalid`, 'Object Storage Service',)
        console.log(validated.error.flatten().fieldErrors)
        console.log(metadata)
        return {success:false, error: validated.error.flatten().fieldErrors}
    }
    logger.info(`File upload request is valid`, 'Object Storage Service')
    try{
        const res = await objrepository.uploadFile(validated.data, 'IMAGE')
        if(!res || !res.success || !res.data){
            logger.error(`File upload request failed`, 'Object Storage Service')
            return failed(500,'INTERNAL','internal')
        }
        logger.info(`File upload request success`, 'Object Storage Service')
        return {success:true, data:res.data}
    }catch(error){
        logger.error(`File upload request failed`, 'Object Storage Service')
        console.log(error)
        return failed(500,'INTERNAL','catch internal')
    }

}