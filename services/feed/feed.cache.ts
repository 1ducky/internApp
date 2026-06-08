import { unstable_cache } from "next/cache"
import { feedServices } from "./feed.service"
import { cacheTag } from "@/libs/cache"

const getCahceDetailFeed = (slug: string) => unstable_cache(
    async () => {
        console.log('🔴 CACHE MISS - fetching from DB, cursor:', slug)
        return await feedServices.getDetailFeed(slug)
    },
    ['detail-feed', 'slug'],
    {
        revalidate: 60 * 60 * 60, //1 hour
        tags: [cacheTag.feed.slug(slug)]
    }
)

export const FeedCache = {
    detailFeed: getCahceDetailFeed
}