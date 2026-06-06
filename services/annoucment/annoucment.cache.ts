import { unstable_cache } from "next/cache"
import { feedServices } from "../feed/feed.service"

const getAnnoucmentCache = unstable_cache(
    async (type: string) => {
        console.log('🔴 CACHE MISS - fetching from DB, type:', type)
        return await feedServices.getFeed(undefined,type)
    },
    ['annoucment', 'post'],
    {
        revalidate: 60 * 60 * 60 //1 hour
    }
)

export const FeedCache = {
    detailFeed: getAnnoucmentCache
}