import { logger } from "@/infrastructure/lib/logger"
import { authService } from "@/services/auth/auth.service"
import { postService } from "@/services/post/post.service"
import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    logger.info("POST request received", 'Post Route POST')
    const user = await authService.getSession()
    const body = await req.json()
    const res = await postService.updatePostById(user.userId,body,slug)
    if(!res.success){
        return NextResponse.json({message:res.message,code:res.status},{status:res.status})
    }
    return NextResponse.json({message:"Submited",code:200}, {status:200})
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    logger.info("DELETE request received", 'Post Route DELETE')
    const user = await authService.getSession()
    const res = await postService.deletePostById(user.userId,slug)
    if(!res.success){
        return NextResponse.json({message:res.message,code:res.status},{status:res.status})
    }
    revalidateTag(`feed-${user.userId}`,'default')
    return NextResponse.json({message:"Deleted",code:200}, {status:200})
}