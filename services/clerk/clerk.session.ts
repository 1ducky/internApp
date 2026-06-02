import { currentUser } from "@clerk/nextjs/server";
import { redirect} from "next/navigation";
import { userRepository } from "../user/user.repository";

export type ClerkSession = {
    userClerkId: string,
    userId: string,
    email: string,
    role: string
}

export type UserPublicMetadata = {
    id: string,
    role: string
}

export async function getAuthSessionClerk() : Promise<ClerkSession> {
    const user = await currentUser()
    if(!user) redirect('/sign-in')
    const metadata = user?.publicMetadata as UserPublicMetadata
    if(!metadata.role && !metadata.id){
        const publicData = await userRepository.userInitializeSession(user?.id!)
        if(publicData.data && publicData.success){
            return {
                userClerkId: user?.id,
                userId: publicData.data.id,
                email: user?.emailAddresses[0].emailAddress,
                role: publicData.data.role
            }
        } 
    }
    return {
        userClerkId: user.id,
        userId: metadata.id,
        email: user.emailAddresses[0].emailAddress,
        role: metadata.role
    }
}