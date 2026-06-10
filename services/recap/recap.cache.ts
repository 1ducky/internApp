import { RecapType } from "@/generated/prisma/enums"
import { unstable_cache } from "next/cache"
import { cacheTag } from "@/libs/cache"
import { recapService } from "./recap.service"


const RecapCache = (start: Date, end: Date, type?: RecapType) => unstable_cache(async () => {
    return await recapService.getRecap(start, end, type)
}, ["recap", type ?? 'all', start.toISOString(), end.toISOString()], {
    revalidate: 60,
    tags: [cacheTag.recap.type(type), ...(start && end ? [cacheTag.recap.date(start, end)] : [])]
})


export const getRecapCache = {
    RecapCache
}