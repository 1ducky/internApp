import { UserProfileForm } from "@/component/dashboard/profile/userProfile";
import { profileRepository } from "@/services/user/profile.repository";
import { currentUser } from "@clerk/nextjs/server";
import CsrProfile from "./csrProfile";

export default async function DashboardPage() {
    const clerkUser = await currentUser()
    const clerkId = clerkUser?.id
    const profile = await profileRepository.getProfileByUserId(clerkId as string)
    if (profile.success) {
        console.log(profile.data)
    }

    return (
        <CsrProfile email={clerkUser?.emailAddresses[0].emailAddress as string} />
    )
}