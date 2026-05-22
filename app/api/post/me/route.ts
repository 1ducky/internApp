import { logger } from "@/infrastructure/lib/logger";
import { authService } from "@/services/auth/auth.service";
import { postService } from "@/services/post/post.service";
import { NextResponse } from "next/server";

export async function GET(){
    const user = await authService.getSession()
    logger.info("Clerk user metadata received", 'Post Route POST')
    try{
        const res = await postService.getUserAllPost(user.userId)
        if(!res.success){
            return NextResponse.json({message:res.message,code:res.status}, {status:res.status})
        }
        return NextResponse.json({message:res.message,code:res.status,data:res.data}, {status:res.status})
    }catch(error){
        logger.error(`Post submission request for user ${user.userId} failed`, 'Post Service')
        console.log(error)
        return NextResponse.json({message:'Internal Server Error',code:500}, {status:500})
    }
}