import { getClerkUserMetaData } from "@/services/clerk/clerk.service";
import { profileService } from "@/services/profile/profile.service";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/infrastructure/lib/logger";

export async function GET(req:NextRequest){
    logger.info("GET request received", 'ProfileRoute GET')
    const clerk = await getClerkUserMetaData(req)
    if(!clerk.success){
        logger.error("Cannot Authenticate User", 'ProfileRoute GET')
        return NextResponse.json({success: false, status:clerk.status,message:clerk.message})
    }
    logger.info("Clerk user metadata received", 'ProfileRoute GET')
    const res = await profileService.getProfile(clerk.data.id as string)
    if(!res.success){
        logger.error("Profile Service Cannot Resolve this request", 'ProfileRoute GET')
        return NextResponse.json({success:false,status:res.status,message:res.message, err: res.error})
    }
    logger.info("Profile data received", 'ProfileRoute GET')
    return NextResponse.json({success:true,status:200,data:res.data})
}

export async function POST(req:NextRequest){
    logger.info("POST request received", 'ProfileRoute POST')
    const clerk = await getClerkUserMetaData(req)
    if(!clerk.success){
        logger.error("Cannot Authenticate user", 'ProfileRoute POST')
        return NextResponse.json({success: false, status:clerk.status,message:clerk.message})
    }
    logger.info("Clerk user metadata received", 'ProfileRoute POST')
    const body = await req.json()
    const res = await profileService.SubmitProfile(clerk.data.id as string,body)
    if(!res.success){
        logger.error("Profile Service Cannot Resolve this request", 'ProfileRoute POST')
        return NextResponse.json({success:false,status:res.status,message:res.message, err: res.error})
    }
    logger.info("Profile data received", 'ProfileRoute POST')
    return NextResponse.json({success:true,status:200,data:res.data})
}