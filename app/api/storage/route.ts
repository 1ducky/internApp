import { authService } from "@/services/auth/auth.service";
import { objectStorageService } from "@/services/objectStorage/obj.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const user = await authService.getSession()
    const body = await req.json()
    const res = await objectStorageService.uploadBulkFileImage(body,user.userId)
    if(!res.success){
        return NextResponse.json({success:false, message:res.message})
    }
    return NextResponse.json({success:true,message:res.message,data:res.data})
}