import { logger } from "@/infrastructure/lib/logger"
import { UTApi } from "uploadthing/server"

export const uploadThingService = {
    deleteFile,
    bulkDeleteFiles
}
const utApi = new UTApi()

async function deleteFile(key:string) {
    logger.info(`Deleting file with key ${key}`, 'UploadThing Service')
    try{
        await utApi.deleteFiles(key)
        logger.info(`File deleted successfully`, 'UploadThing Service')
        return {success:true, data:null}
    }catch(err){
        logger.error(`File deletion failed`, 'UploadThing Service')
        console.log(err)
        return {success:false, error:err}
    }
}

async function bulkDeleteFiles(keys:string[]) {
    logger.info(`Deleting files with keys ${keys}`, 'UploadThing Service')
    try{
        const deleted = await utApi.deleteFiles(keys)
        logger.info(`Files deleted successfully`, 'UploadThing Service')
        return {success:true, data:deleted.deletedCount}
    }catch(err){
        logger.error(`Files deletion failed`, 'UploadThing Service')
        console.log(err)
        return {success:false, error:err}
    }
}