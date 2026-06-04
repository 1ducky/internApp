import { logger } from "@/infrastructure/lib/logger";
import prisma from "@/libs/db";
import { uploadThingService } from "@/services/UploadThing/uploadthing.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req:NextRequest){
    const authHeader = req.headers.get('Authorization');
    const cronSecret = process.env.CRON_SECRET?.trim();
    const token = authHeader?.split(' ')[1].trim()

    if (!cronSecret || token !== cronSecret) {
        return Response.json({message:"Unauthorized"},{status:401})
    }

    const temp = await prisma.files.findMany({
        where:{
            OR:[
                {fileStatus:'TEMP'},
                {fileStatus:'ORPHAN'}
            ]
        },
        select:{
            id:true,
            fileKey:true,
            createdAt:true,
        }
    })

    if(temp.length === 0){
        return NextResponse.json({message:'No temp files found',total:0})
    }

    const fileKeys = temp.map(file => file.fileKey)
    const Ids = temp.map(file => file.id)
    const {success,data} = await uploadThingService.bulkDeleteFiles(fileKeys)
    if(success && data){
        await prisma.files.updateMany({
            where:{
                id:{in:Ids}
            },
            data:{
                fileStatus:'DELETED'
            }
        })
        logger.info(`Deleted ${data} temp files`, 'UploadThing Cron')
    }
    if(!success && data && data < temp.length){
        logger.error(`Failed to delete ${temp.length-data} temp files`, 'UploadThing Cron')
        return NextResponse.json({message:`Failed to delete ${temp.length-data} temp files`,total:data})
    }

    return NextResponse.json({message:'success cleaned temp files',total:temp.length})
    
}