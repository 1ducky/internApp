import { UserProfileForm } from "@/component/dashboard/profile/userProfile";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
    const clerkUser = await currentUser()


    return (
        <>
            <UserProfileForm email={clerkUser?.emailAddresses[0].emailAddress as string} />
        </>
    )
}