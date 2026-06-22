import { unstable_cache } from "next/cache";
import { userService } from "./user.service";
import { UserManagementMeta } from "./user.dto";
import { cacheTag } from "@/libs/cache";



const userManagementCache = (limit: number, cursor?: string, email?: string) => {
    return unstable_cache(async (): Promise<UserManagementMeta> => {
        console.log("cacheMiss")
        return userService.getUserManagement(email, cursor, limit)
    }, [
        "user-management",
        cursor ?? 'all',
        limit.toString(),
        email ?? 'all'
    ], {
        revalidate: 60,
        tags: [cacheTag.user.all(), cacheTag.user.cursor(cursor), cacheTag.user.limit(limit), cacheTag.user.email(email)]
    })
}


export const userCache = {
    userManagementCache,
}