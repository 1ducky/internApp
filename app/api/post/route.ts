import { logger } from "@/infrastructure/lib/logger";
import { getClerkUserMetaData } from "@/services/clerk/clerk.service";
import { postService } from "@/services/post/post.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    logger.info("POST request received", 'Post Route POST')
    const clerk = await getClerkUserMetaData(req)
    if(!clerk.success) {
        logger.error("Cannot Authenticate User", 'Post Route POST')
        return NextResponse.json({message:'Authentication Failed',code:401}, {status:401})
    }
    logger.info("Clerk user metadata received", 'Post Route POST')
    const metadata = clerk.data
    const body = await req.json()
    const res = await postService.submitPost(metadata,body)
    if(!res.success){
        return NextResponse.json({message:res.message,code:res.status},{status:res.status})
    }
    return NextResponse.json({message:"Submited",code:200}, {status:200})
}