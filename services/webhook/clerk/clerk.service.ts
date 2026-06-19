import { clerkClient, WebhookEvent } from "@clerk/nextjs/server"
import { normalizeClerkUser, userCreatedSchema, userDeletedSchema, userMetaDataSchema, userUpdatedSchema } from "./clerk.schema"
import { userRepository } from "@/services/user/user.repository"
import { logger } from "@/infrastructure/lib/logger"
import { failed, ok } from "@/utils/responseMapper"
import { setUserMetaData } from "@/services/clerk/clerk.session"

export const clerkService = {
    userCreated,
    userUpdated,
    userDeleted,
    sessionCreated
}

async function sessionCreated(evt: WebhookEvent) {
    logger.debug(evt.type, 'ClerkService')
    const clerkId = evt.data.id
    if (!clerkId) {
        logger.error('Validate Error', 'sessionCreated')
        return failed(400, { message: 'Validate Error' }, 'Validate Error')
    }
    const res = await userRepository.userInitializeSession(clerkId)
    if (!res.success) {
        logger.error('Failed to initialize session', 'sessionCreated')
        const create = await userCreated(evt)
        return create
    }
    if (res.data) {
        await setUserMetaData(clerkId, res.data)
        logger.info(`Set User MetaData`, 'sessionCreated')
    }
    return ok(null, 'Updated Meta Data')
}

async function userCreated(evt: WebhookEvent) {
    logger.debug(evt.type, 'ClerkService')
    const input = normalizeClerkUser(evt)
    const validatedInput = userCreatedSchema.safeParse(input)
    if (validatedInput.error) {
        logger.error('Validate Error', 'userCreated')
        console.log(validatedInput.error.flatten().fieldErrors)
        return failed(400, validatedInput.error.flatten().fieldErrors, 'Validate Error')
    }
    const res = await userRepository.userCreate(validatedInput.data)
    if (!res.success) {
        logger.error('Failed to create user', 'userCreated')
        return failed(400, { message: 'Failed to create user' }, 'Failed to create user')
    }
    if (res.data) {
        await setUserMetaData(res.data.clerkId, res.data)
        logger.info('Set user metadata', 'userCreated')
    }
    return ok(null, 'User created successfully')
}

async function userUpdated(evt: WebhookEvent) {
    logger.debug(evt.type, 'ClerkService')
    const input = normalizeClerkUser(evt)
    const validatedInput = userUpdatedSchema.safeParse(input)
    if (validatedInput.error) {
        logger.error('Validate Error', 'userUpdated')
        return failed(400, validatedInput.error.flatten().fieldErrors, 'Validate Error')
    }
    const res = await userRepository.userUpdate(validatedInput.data)
    if (!res.success) {
        logger.error('Failed to update user', 'userUpdated')
        return failed(400, { message: 'Failed to update user' }, 'Failed to update user')
    }
    if (res.data) {
        logger.info('Set user metadata', 'userCreated')
        await setUserMetaData(res.data.clerkId, res.data)
    }
    return ok(null, 'User updated successfully')
}

async function userDeleted(evt: WebhookEvent) {
    logger.debug(evt.type, 'ClerkService')
    const input = normalizeClerkUser(evt)
    const validatedInput = userDeletedSchema.safeParse(input)
    if (validatedInput.error) {
        logger.error('Validate Error', 'userDeleted')
        return failed(400, validatedInput.error.flatten().fieldErrors, 'Validate Error')
    }
    const res = await userRepository.userDelete(validatedInput.data)
    if (!res.success) {
        logger.error('Failed to delete user', 'userDeleted')
        return failed(400, { message: 'Failed to delete user' }, 'Failed to delete user')
    }
    return ok(null, 'User deleted successfully')
}

