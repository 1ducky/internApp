import { cacheTag, revokeCache } from "@/libs/cache";
import { cronJobService } from "@/services/cronjob/cron.service";
import { recapService } from "@/services/recap/recap.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    const cronAuth = cronJobService.cronAuth(authHeader);
    if (!cronAuth) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    const query = await req.nextUrl.searchParams
    const date = query.get('date')
    const now = date ? new Date(date) : new Date()
    const post = await recapService.DailyRecapPost(now)
    revokeCache(cacheTag.recap.type())
    return NextResponse.json({ message: `Successfully Recap Post: ${post.postTotal}`, recapAt: post.recapAt.toISOString() })
}