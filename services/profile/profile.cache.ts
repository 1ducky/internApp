import { unstable_cache } from "next/cache"
import { profileService } from "./profile.service"

const getCahcePublicProfile = (userId: string) => unstable_cache(
    async () => {
        console.log('🔴 CACHE MISS - fetching from DB, cursor:', userId)
        return await profileService.getPublicProfile(userId)
    },
    ['public-profile', 'userId', userId],
    {
        revalidate: 60 * 60
    }
)

export const ProfileCache = {
    publicProfile: getCahcePublicProfile
}