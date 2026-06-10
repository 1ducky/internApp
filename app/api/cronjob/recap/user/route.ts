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
    const now = new Date()
    const user = await recapService.DailyRecapUser(now)
    revokeCache(cacheTag.recap.type())
    return NextResponse.json({ message: `Successfully Recap User: ${user.userTotal}`, recapAt: user.recapAt.toISOString() })
}