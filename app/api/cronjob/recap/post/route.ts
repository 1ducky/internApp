import { recapService } from "@/services/recap/recap.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    const cronSecret = process.env.CRON_SECRET?.trim();
    const token = authHeader

    if (!cronSecret || token !== cronSecret) {
        return Response.json({ message: "Unauthorized" }, { status: 401 })
    }
    const query = await req.nextUrl.searchParams
    const date = query.get('date')
    const now = date ? new Date(date) : new Date()
    const post = await recapService.DailyRecapPost(now)
    return NextResponse.json({ message: `Successfully Recap Post: ${post.postTotal}`, recapAt: post.recapAt.toISOString() })
}