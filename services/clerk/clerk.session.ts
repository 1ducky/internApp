import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { userRepository } from "../user/user.repository";
import { logger } from "@/infrastructure/lib/logger";
import { userMetaDataSchema } from "../webhook/clerk/clerk.schema";
import { failed } from "@/utils/responseMapper";

export type ClerkSession = {
    userClerkId: string,
    userId: string,
    email: string,
    role: string
    img?: string
    name?: string
    bannedCode?: string
    status: string
}

export type UserPublicMetadata = {
    id: string,
    role: string
    bannedCode?: string
    status: string
}

export async function getAuthSessionClerk(): Promise<ClerkSession | undefined> {
    const user = await currentUser()
    if (!user) return undefined
    const externalAccountGoogle = user.externalAccounts.find((account) => account.provider === 'oauth_google')
    const fullname = externalAccountGoogle?.firstName + ' ' + externalAccountGoogle?.lastName
    const metadata = user?.publicMetadata as UserPublicMetadata
    if (!metadata.role && !metadata.id || !metadata.status) {
        const publicData = await userRepository.userInitializeSession(user.id)
        if (!publicData.success || !publicData.data) {
            logger.error('Failed to initialize session', 'getAuthSessionClerk')
            return undefined
        }
        if (publicData.data) {
            await setUserMetaData(user.id, publicData.data)
            return {
                userClerkId: user.id,
                userId: publicData.data.id,
                email: user.emailAddresses[0].emailAddress,
                role: publicData.data.role,
                img: user.imageUrl,
                name: publicData.data.name ?? user.username ?? fullname,
                bannedCode: publicData.data.bannedCode ?? undefined,
                status: publicData.data.status
            }
        }
    }
    const metaDataVersion = user.publicMetadata.version || '0'
    const currentVerssion = process.env.NEXT_PUBLIC_METADATA_VERSION || '0'
    if (metaDataVersion !== currentVerssion) {
        await setUserMetaData(user.id, user.publicMetadata)
    }
    return {
        userClerkId: user.id,
        userId: metadata.id,
        email: user.emailAddresses[0].emailAddress,
        role: metadata.role,
        img: user.imageUrl,
        name: user.username ?? fullname,
        bannedCode: metadata.bannedCode ?? undefined,
        status: metadata.status
    }
}

export async function setUserMetaData(userClerkId: string, metadata: unknown) {
    logger.info('Set user metadata request', 'setUserMetaData')
    const validatedMetadata = userMetaDataSchema.safeParse(metadata)
    if (validatedMetadata.error) {
        logger.error('Validate Error', 'setUserMetaData')
        return failed(400, validatedMetadata.error.flatten().fieldErrors, 'Validate Error')
    }
    const version = process.env.NEXT_PUBLIC_METADATA_VERSION || '0'
    const client = await clerkClient()
    await client.users.updateUserMetadata(userClerkId, {
        publicMetadata: { ...validatedMetadata.data, version: version }
    })
    logger.info('Set user metadata', 'setUserMetaData')
}
