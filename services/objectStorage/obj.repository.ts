import prisma from "@/libs/db";
import { ObjInput, ObjType } from "./obj.schema";

export const objrepository = {
    uploadFile
}

async function uploadFile(metadata: ObjInput, type:ObjType) {
    const db =  await prisma.files.create({
        data:{
            fileType:type,
            fileUrl: metadata.fileUrl,
            fileSize: metadata.fileSize,
            mimeType: metadata.mimeType,
            fileName: metadata.fileName,
            fileKey: metadata.fileKey,
            authorId: metadata.authorId
        },
        select:{
            id:true,
        }
    })
    if(!db){
        return {success:false}
    }
    return {success:true, data:db}
}