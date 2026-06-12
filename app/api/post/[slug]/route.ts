import { logger } from "@/infrastructure/lib/logger"
import { cacheTag, revokeCache } from "@/libs/cache"
import { authService } from "@/services/auth/auth.service"
import { postService } from "@/services/post/post.service"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    logger.info("POST request received", 'Post Route POST')
    const user = await authService.getSession()
    const body = await req.json()
    if (!user) return NextResponse.json({ message: "User not found", code: 401 }, { status: 401 })
    const res = await postService.updatePostById(user.userId, body, slug, user.role)
    if (!res.success) {
        return NextResponse.json({ message: res.message, code: res.status }, { status: res.status })
    }
    revokeCache(cacheTag.feed.user(user.userId), cacheTag.profile.public(user.userId), cacheTag.feed.slug(slug), cacheTag.feed.type(res.data.type))
    return NextResponse.json({ message: "Submited", code: 200 }, { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    logger.info("DELETE request received", 'Post Route DELETE')
    const user = await authService.getSession()
    if (!user) return NextResponse.json({ message: "User not found", code: 401 }, { status: 401 })
    const res = await postService.deletePostById(user.userId, slug)
    if (!res.success) {
        return NextResponse.json({ message: res.message, code: res.status }, { status: res.status })
    }
    revokeCache(cacheTag.feed.user(user.userId), cacheTag.profile.public(user.userId), cacheTag.feed.slug(slug))
    return NextResponse.json({ message: "Deleted", code: 200 }, { status: 200 })
}