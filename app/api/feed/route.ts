import { cacheTag } from "@/libs/cache";
import { feedServices } from "@/services/feed/feed.service";
import { unstable_cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const getCacheFeed = (type?: string, userid?: string) => unstable_cache(
    async (cursor?: string, take: number = 10) => {
        console.log('🔴 CACHE MISS - fetching from DB, cursor:', cursor)
        return await feedServices.getFeed(cursor, type, take, userid)
    },
    ['feed', type ? type : 'random', userid ?? 'all'],
    {
        revalidate: 5 * 60 * 60,
        tags: [
            cacheTag.feed.all(),
            ...(type ? [cacheTag.feed.type(type)] : []),
            ...(userid ? [cacheTag.feed.user(userid)] : [])
        ]
    }
)

export async function GET(req: NextRequest) {
    const query = await req.nextUrl.searchParams
    const cursor = query.get('cursor') ?? undefined
    const take = parseInt(query.get('take') ?? '10')
    const type = query.get('type') ?? undefined
    const userid = query.get('userId') ?? undefined
    if (cursor && cursor.length < 20) {
        return NextResponse.json({ Feeds: [], NextCursor: null }, { status: 200 })
    }
    const feed = await getCacheFeed(type, userid)(cursor, take)
    return NextResponse.json({ feed }, { status: 200 })
}