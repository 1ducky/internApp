import { profileService } from "@/services/profile/profile.service";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/infrastructure/lib/logger";
import { cacheTag, revokeCache } from "@/libs/cache";
import { AuthGuard } from "@/services/auth/auth.helper";

export async function GET() {
    logger.info("GET request received", 'ProfileRoute GET')
    const user = await AuthGuard({ status: 'ACTIVE' })
    if (!user.success || !user.data) return NextResponse.json(user, { status: user.status })
    const res = await profileService.getProfile(user.data.userId)
    if (!res.success) {
        logger.error("Profile Service Cannot Resolve this request", 'ProfileRoute GET')
        return NextResponse.json({ success: false, status: res.status, message: res.message, err: res.error })
    }
    logger.info("Profile data received", 'ProfileRoute GET')
    return NextResponse.json({ success: true, status: 200, data: res.data })
}

export async function POST(req: NextRequest) {
    logger.info("POST request received", 'ProfileRoute POST')
    const user = await AuthGuard({ status: 'ACTIVE' })
    if (!user.success || !user.data) return NextResponse.json(user, { status: user.status })
    const body = await req.json()
    const res = await profileService.SubmitProfile(user.data.userId, body)
    if (!res.success) {
        logger.error("Profile Service Cannot Resolve this request", 'ProfileRoute POST')
        return NextResponse.json({ success: false, status: res.status, message: res.message, err: res.error })
    }
    logger.info("Profile data received", 'ProfileRoute POST')
    revokeCache(cacheTag.profile.public(user.data.userId), cacheTag.profile.user(user.data.userId))
    return NextResponse.json({ success: true, status: 200, data: res.data })
}