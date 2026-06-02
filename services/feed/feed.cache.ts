import { unstable_cache } from "next/cache"
import { feedServices } from "./feed.service"

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

export const FeedCache = {
    detailFeed: getCahceDetailFeed
}