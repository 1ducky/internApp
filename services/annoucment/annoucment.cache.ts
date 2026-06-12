import { unstable_cache } from "next/cache"
import { feedServices } from "../feed/feed.service"
import { cacheTag } from "@/libs/cache"

const getAnnoucmentCache = (type: string) => unstable_cache(
    async () => {
        console.log('🔴 CACHE MISS - fetching from DB, type:', type)
        return await feedServices.getFeed(undefined, type, 2)
    },
    ['annoucment', 'post'],
    {
        revalidate: 60 * 60,//1 hour
        tags: [cacheTag.feed.type(type)]
    }
)

export const annoucmentCache = {
    getAnnoucmentCache
}