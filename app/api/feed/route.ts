import { feedServices } from "@/services/feed/feed.service";
import { unstable_cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const getCacheFeed = (type?:string) => unstable_cache(
    async (cursor?: string,take:number=10) => { 
        console.log('🔴 CACHE MISS - fetching from DB, cursor:', cursor)
        return await feedServices.getFeed(cursor,type,take) 
    },
    ['feed',type ? type : 'random'],
    { revalidate: 5 * 60 * 60 }
)

export async function GET(req: NextRequest) {
    const query = await req.nextUrl.searchParams
    const cursor = query.get('cursor') ?? undefined
    const take = parseInt(query.get('take') ?? '10')
    const type = query.get('type') ?? undefined
    if (cursor && cursor.length < 20) {
        return NextResponse.json({ Feeds: [], NextCursor: null }, { status: 200 })
    }
    const feed = await getCacheFeed(type)(cursor,take)
    return NextResponse.json({ feed }, { status: 200 })
}