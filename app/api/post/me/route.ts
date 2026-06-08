import { authService } from "@/services/auth/auth.service";
import { NextResponse } from "next/server";

import { feedServices } from "@/services/feed/feed.service";
import { unstable_cache } from "next/cache";
import { NextRequest } from "next/server";
import { cacheTag } from "@/libs/cache";

const getCacheFeed = (userId: string) => unstable_cache(
    async (cursor?: string, type?: string) => {
        console.log('🔴 CACHE MISS - fetching from DB, cursor:', cursor)
        return await feedServices.getOwnFeed(userId, cursor, type)
    },
    ['feed', userId],
    { revalidate: 5 * 60 * 60, tags: [cacheTag.feed.user(userId)] }
)

export async function GET(req: NextRequest) {
    const user = await authService.getSession()
    const query = await req.nextUrl.searchParams
    const cursor = query.get('cursor') ?? undefined
    const type = query.get('type') ?? undefined
    if (cursor && cursor.length < 20) {
        return NextResponse.json({ Feeds: [], NextCursor: null }, { status: 200 })
    }
    if (!user) return NextResponse.json({ message: "User not found", code: 401 }, { status: 401 })
    const feed = await getCacheFeed(user.userId)(cursor, type)
    return NextResponse.json({ feed }, { status: 200 })
}