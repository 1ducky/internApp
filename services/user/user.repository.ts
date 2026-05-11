import prisma from "@/libs/db"
import { UserCreatedInput, UserDeletedInput, UserUpdatedInput } from "../webhook/clerk/clerk.schema"

export const userRepository = {
    userCreate,
    userUpdate,
    userDelete
}

async function userCreate (input: UserCreatedInput) {
    const db = await prisma.user.upsert({
        where:{
            email: input.email,
        },
        update: {
            clerkId: input.clerkId,
            email: input.email,
            name: input.username,
            imageUrl: input.imageUrl,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
            
        },
        create: {
            clerkId: input.clerkId,
            email: input.email,
            name: input.username,
            imageUrl: input.imageUrl,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        }
    })
    if(!db){
        return {success: false}
    }
    return {success: true}
}

async function userUpdate (input: UserUpdatedInput) {
    const db = await prisma.user.upsert({
        where:{
            email: input.email,
        },
        update: {
            clerkId:input.clerkId,
            email: input.email,
            name: input.username,
            imageUrl: input.imageUrl,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        },
        create: {
            clerkId: input.clerkId,
            email: input.email,
            name: input.username,
            imageUrl: input.imageUrl, 
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        }
    })
    if(!db){
        return {success: false}
    }
    return {success: true}
}

async function userDelete (input: UserDeletedInput) {
    const db = await prisma.user.delete({
        where: {
            clerkId: input.clerkId,
        }
    })
    // if(!db){
    //     return {success: false}
    // }
    return {success: true}
}