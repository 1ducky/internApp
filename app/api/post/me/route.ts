import { logger } from "@/infrastructure/lib/logger";
import { getClerkUserMetaData } from "@/services/clerk/clerk.service";
import { postService } from "@/services/post/post.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    logger.info("POST request received", 'Post Route POST')
    const clerk = await getClerkUserMetaData(req)
    if(!clerk.success) {
        logger.error("Cannot Authenticate User", 'Post Route POST')
        return NextResponse.json({message:'Authentication Failed',code:401}, {status:401})
    }
    logger.info("Clerk user metadata received", 'Post Route POST')
    const metadata = clerk.data
    try{
        const res = await postService.getUserAllPost(metadata)
        return NextResponse.json({message:res.message,code:res.status}, {status:res.status})
    }catch(error){
        logger.error(`Post submission request for user ${metadata.id} failed`, 'Post Service')
        console.log(error)
        return NextResponse.json({message:'Internal Server Error',code:500}, {status:500})
    }
}