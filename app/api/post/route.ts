import { logger } from "@/infrastructure/lib/logger";
import { cacheTag, revokeCache } from "@/libs/cache";
import { authService } from "@/services/auth/auth.service";
import { postService } from "@/services/post/post.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user = await authService.getSession()
    logger.info("Clerk user metadata received", 'Post Route POST')
    const body = await req.json()
    if (!user) return NextResponse.json({ message: "User not found", code: 401 }, { status: 401 })
    const res = await postService.submitPost(user.userId, body, user.role)
    if (!res.success) {
        return NextResponse.json({ message: res.message, code: res.status }, { status: res.status })
    }
    revokeCache(cacheTag.feed.user(user.userId), cacheTag.profile.public(user.userId))
    return NextResponse.json({ message: "Submited", code: 200 }, { status: 200 })
}