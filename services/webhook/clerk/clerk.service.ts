import { WebhookEvent } from "@clerk/nextjs/server"
import { normalizeClerkUser, userCreatedSchema, userDeletedSchema, userUpdatedSchema } from "./clerk.schema"
import { userRepository } from "@/services/user/user.repository"

export const clerkService = {
    userCreated,
    userUpdated,
    userDeleted
}

async function userCreated (evt: WebhookEvent) {
    console.log('userCreated')
    const input = normalizeClerkUser(evt)
    const validatedInput = userCreatedSchema.safeParse(input)
    if(validatedInput.error){
        throw new Error(JSON.stringify(validatedInput.error.flatten().fieldErrors))
    }
    const res = await userRepository.userCreate(validatedInput.data)
    if(!res.success){
        throw new Error('Failed to create user')
    }
    return {success: true}

}

async function userUpdated (evt: WebhookEvent) {
    console.log('userUpdated')
    const input = normalizeClerkUser(evt)
    const validatedInput = userUpdatedSchema.safeParse(input)
    if(validatedInput.error){
        throw new Error(JSON.stringify(validatedInput.error.flatten().fieldErrors))
    }
    const res = await userRepository.userUpdate(validatedInput.data)
    if(!res.success){
        throw new Error('Failed to update user')
    }
    return {success: true}

}

async function userDeleted (evt: WebhookEvent) {
    console.log('userDeleted')
    const input = normalizeClerkUser(evt)
    const validatedInput = userDeletedSchema.safeParse(input)
    if(validatedInput.error){
        throw new Error(JSON.stringify(validatedInput.error.flatten().fieldErrors))
    }   
    const res = await userRepository.userDelete(validatedInput.data)
    if(!res.success){
        throw new Error('Failed to delete user')
    }
    return {success: true}

}