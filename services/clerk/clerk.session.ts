import { currentUser } from "@clerk/nextjs/server";
import { redirect} from "next/navigation";

export type ClerkSession = {
    userClerkId: string,
    userId: string,
    email: string,
    role: string
}

export type UserPublicMetadata = {
    id?: string,
    role?: string
}

export async function getAuthSessionClerk() : Promise<ClerkSession> {
    const user = await currentUser()
    const metadata = user?.publicMetadata as UserPublicMetadata
    if(!user || !metadata.id || !metadata.role) redirect('/sign-in')
    return {
        userClerkId: user.id,
        userId: metadata.id,
        email: user.emailAddresses[0].emailAddress,
        role: metadata.role
    }
}