import { authService } from "@/services/auth/auth.service";
import { profileService } from "@/services/profile/profile.service";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/infrastructure/lib/logger";
import { cacheTag, revokeCache } from "@/libs/cache";

export async function GET() {
    logger.info("GET request received", 'ProfileRoute GET')
    const user = await authService.getSession()
    if (!user) return NextResponse.json({ message: "User not found", code: 401 }, { status: 401 })
    const res = await profileService.getProfile(user.userId)
    if (!res.success) {
        logger.error("Profile Service Cannot Resolve this request", 'ProfileRoute GET')
        return NextResponse.json({ success: false, status: res.status, message: res.message, err: res.error })
    }
    logger.info("Profile data received", 'ProfileRoute GET')
    return NextResponse.json({ success: true, status: 200, data: res.data })
}

export async function POST(req: NextRequest) {
    logger.info("POST request received", 'ProfileRoute POST')
    const user = await authService.getSession()
    if (!user) return NextResponse.json({ message: "User not found", code: 401 }, { status: 401 })
    const body = await req.json()
    const res = await profileService.SubmitProfile(user.userId, body)
    if (!res.success) {
        logger.error("Profile Service Cannot Resolve this request", 'ProfileRoute POST')
        return NextResponse.json({ success: false, status: res.status, message: res.message, err: res.error })
    }
    logger.info("Profile data received", 'ProfileRoute POST')
    revokeCache(cacheTag.profile.public(user.userId), cacheTag.profile.user(user.userId))
    return NextResponse.json({ success: true, status: 200, data: res.data })
}