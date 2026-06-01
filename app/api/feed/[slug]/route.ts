import { feedServices } from "@/services/feed/feed.service";
import { unstable_cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const getCahceDetailFeed = unstable_cache(
    async (slug: string) => {
        console.log('🔴 CACHE MISS - fetching from DB, cursor:', slug)
        return await feedServices.getDetailFeed(slug)
    },
    ['detail-feed', 'slug'],
    {
        revalidate: 60 * 60 * 60 //1 hour
    }
)

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    if (slug && slug.length < 25) {
        return NextResponse.json({ error: "Slug is too short" }, { status: 400 })
    }
    const feed = await getCahceDetailFeed(slug)
    return NextResponse.json({ feed }, { status: 200 })

}