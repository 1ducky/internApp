import { logger } from "@/infrastructure/lib/logger"
import { cacheTag, revokeCache } from "@/libs/cache"
import { AuthGuard } from "@/services/auth/auth.helper"
import { toResponsePostToFeedApi } from "@/services/post/post.dto"
import { postService } from "@/services/post/post.service"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    logger.info("POST request received", 'Post Route POST')
    const user = await AuthGuard({ permissions: ['post:update'], status: 'ACTIVE' })
    if (!user.success || !user.data) return NextResponse.json(user, { status: user.status })
    const body = await req.json()
    if (!user) return NextResponse.json({ message: "User not found", code: 401 }, { status: 401 })
    const res = await postService.updatePostById(user.data.userId, body, slug, user.data.role)
    if (!res.success || !res.data) {
        return NextResponse.json(toResponsePostToFeedApi(res.message || 'internal Error', res.status, res.message || 'Internal Error', undefined), { status: res.status })
    }
    revokeCache(cacheTag.feed.user(user.data.userId), cacheTag.profile.public(user.data.userId), cacheTag.feed.slug(slug), cacheTag.feed.type(res.data?.type))
    return NextResponse.json(toResponsePostToFeedApi('Updated', 200, undefined, res.data), { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    logger.info("DELETE request received", 'Post Route DELETE')
    const user = await AuthGuard({ permissions: ['post:delete'], status: 'ACTIVE' })
    if (!user.success || !user.data) return NextResponse.json(user, { status: user.status })
    const res = await postService.deletePostById(user.data.userId, slug)
    if (!res.success) {
        return NextResponse.json({ message: res.message, code: res.status }, { status: res.status })
    }
    revokeCache(cacheTag.feed.user(user.data.userId), cacheTag.profile.public(user.data.userId), cacheTag.feed.slug(slug))
    return NextResponse.json({ message: "Deleted", code: 200 }, { status: 200 })
}