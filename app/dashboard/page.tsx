
import { profileRepository } from "@/services/profile/profile.repository";
import { currentUser } from "@clerk/nextjs/server";
import CsrProfile from "./csrProfile";

export default async function DashboardPage() {
    const clerkUser = await currentUser()
    const clerkId = clerkUser?.publicMetadata?.id
    const profile = await profileRepository.getProfileByUserId(clerkId as string)
    if (!profile.success) {
        console.log(profile.data)
    }
    const serializedProfile = profile.data
        ? {
            ...profile.data,
            birthDate: profile.data.birthDate
                ? new Date(profile.data.birthDate)
                    .toISOString()
                    .split('T')[0]
                : '',
        }
        : null


    return (
        <CsrProfile email={clerkUser?.emailAddresses[0].emailAddress as string} data={serializedProfile} />
    )
}