import {authService} from "@/services/auth/auth.service";
import { profileService } from "@/services/profile/profile.service";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/infrastructure/lib/logger";

export async function GET(){
    logger.info("GET request received", 'ProfileRoute GET')
    const user = await authService.getSession()
    const res = await profileService.getProfile(user.userId)
    if(!res.success){
        logger.error("Profile Service Cannot Resolve this request", 'ProfileRoute GET')
        return NextResponse.json({success:false,status:res.status,message:res.message, err: res.error})
    }
    logger.info("Profile data received", 'ProfileRoute GET')
    return NextResponse.json({success:true,status:200,data:res.data})
}

export async function POST(req:NextRequest){
    logger.info("POST request received", 'ProfileRoute POST')
    const user = await authService.getSession()
    const body = await req.json()
    const res = await profileService.SubmitProfile(user.userId,body)
    if(!res.success){
        logger.error("Profile Service Cannot Resolve this request", 'ProfileRoute POST')
        return NextResponse.json({success:false,status:res.status,message:res.message, err: res.error})
    }
    logger.info("Profile data received", 'ProfileRoute POST')
    return NextResponse.json({success:true,status:200,data:res.data})
}