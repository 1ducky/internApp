import { logger } from "@/infrastructure/lib/logger"
import { objListSchema, objSchema } from "./obj.schema"
import { objrepository } from "./obj.repository"
import { failed, ok } from "@/utils/responseMapper"

export const objectStorageService = {
    uploadFileImage,
    uploadBulkFileImage,
    getTempFileImage
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

async function uploadBulkFileImage(metadata:unknown,userId:string) {
    logger.info('Recaived', 'ObjService')
    const validated = objListSchema.safeParse(metadata)
    if(!validated || !validated.data){
        return failed(400,validated.error.flatten().fieldErrors, 'Bad Request')
    }
    try{
        const res = await objrepository.uploadBulkFile(validated.data,userId,'IMAGE')
        if(!res){
            logger.error('prisma internal', 'ObjService')
            return failed(500,'INTERNAL', 'Internal')
        }
        logger.info('success', 'ObjService')
        return ok(res.data,'success bulk upload')
    }catch(err){
        logger.error(`File bulk upload request failed`, 'Object Storage Service')
        console.log(err)
        return failed(500,'INTERNAL','catch internal')
    }
}

async function getTempFileImage(userId:string){
    logger.info('Recaived', 'ObjService')
    try{
        const res = await objrepository.getTempFile(userId,'IMAGE')
        if(!res){
            logger.error('prisma internal', 'ObjService')
            return failed(500,'INTERNAL', 'Internal')
        }
        logger.info('success', 'ObjService')
        return ok(res.data,'success bulk upload')
    }catch(err){
        logger.error(`File bulk upload request failed`, 'Object Storage Service')
        console.log(err)
        return failed(500,'INTERNAL','catch internal')
    }
}