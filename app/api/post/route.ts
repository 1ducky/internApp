import { logger } from "@/infrastructure/lib/logger";
import { cacheTag, revokeCache } from "@/libs/cache";
import { AuthGuard } from "@/services/auth/auth.helper";
import { toResponsePostToFeedApi } from "@/services/post/post.dto";
import { postService } from "@/services/post/post.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user = await AuthGuard({ permissions: ['post:create'], status: 'ACTIVE' })
    if (!user.success || !user.data) return Response.json(user, { status: user.status })
    logger.info("Clerk user metadata received", 'Post Route POST')
    const body = await req.json()
    if (!user) return NextResponse.json({ message: "User not found", code: 401 }, { status: 401 })
    const res = await postService.submitPost(user.data.userId, body, user.data.role)
    if (!res.success || !res.data) {
        return NextResponse.json(toResponsePostToFeedApi(res.message || 'internal Error', res.status, res.message, undefined), { status: res.status })
    }
    revokeCache(cacheTag.feed.user(user.data.userId), cacheTag.profile.public(user.data.userId), cacheTag.feed.type(res.data?.type))
    console.log(toResponsePostToFeedApi("Submited", 200, undefined, res.data))
    return NextResponse.json(toResponsePostToFeedApi("Submited", 200, undefined, res.data || undefined), { status: 200 })
}