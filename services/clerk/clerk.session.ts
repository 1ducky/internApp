import { currentUser } from "@clerk/nextjs/server";
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

export async function getAuthSessionClerk() : Promise<ClerkSession | undefined> {
    const user = await currentUser()
    if(!user) return undefined
    const metadata = user?.publicMetadata as UserPublicMetadata
    if(!metadata.role && !metadata.id){
        const publicData = await userRepository.userInitializeSession(user.id)
        if(publicData.data && publicData.success){
            return {
                userClerkId: user.id,
                userId: publicData.data.id,
                email: user.emailAddresses[0].emailAddress,
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