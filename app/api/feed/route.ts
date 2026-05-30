import { feedServices } from "@/services/feed/feed.service";
import { unstable_cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const getCacheFeed = unstable_cache(
    async (cursor?: string) => { 
        console.log('🔴 CACHE MISS - fetching from DB, cursor:', cursor)
        return await feedServices.getFeed(cursor) 
    },
    ['feed'],
    { revalidate: 5 * 60 * 60 }
)

export async function GET(req: NextRequest) {
    const query = await req.nextUrl.searchParams
    const cursor = query.get('cursor') ?? undefined
    if (cursor && cursor.length < 20) {
        return NextResponse.json({ Feeds: [], NextCursor: null }, { status: 200 })
    }
    const feed = await getCacheFeed(cursor)
    return NextResponse.json({ feed }, { status: 200 })
}