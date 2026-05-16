import { getClerkUserMetaData } from "@/services/clerk/clerk.service";
import { profileService } from "@/services/profile/profile.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const clerk = await getClerkUserMetaData(req)
    if(!clerk.success){
        return NextResponse.json({success: false, status:clerk.status,message:clerk.message})
    }
    const res = await profileService.getProfile(clerk.data.id as string)
    if(!res.success){
        return NextResponse.json({success:false,status:res.status,message:res.message, err: res.error})
    }
    return NextResponse.json({success:true,status:200,data:res.data})
}

export async function POST(req:NextRequest){
    const clerk = await getClerkUserMetaData(req)
    if(!clerk.success){
        return NextResponse.json({success: false, status:clerk.status,message:clerk.message})
    }
    const body = await req.json()
    console.log(body)
    const res = await profileService.SubmitProfile(clerk.data.id as string,body)
    if(!res.success){
        return NextResponse.json({success:false,status:res.status,message:res.message, err: res.error})
    }
    return NextResponse.json({success:true,status:200,data:res.data})
}