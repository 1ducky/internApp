import prisma from "@/libs/db"
import { UserCreatedInput, UserDeletedInput, UserUpdatedInput } from "../webhook/clerk/clerk.schema"
import { TUserRole, TUserStatus } from "./user.domain"

export const userRepository = {
    userCreate,
    userUpdate,
    userDelete,
    userInitializeSession,
    getUserManagement
}

export const userRepositoryTransaction = {
    updateUserStatus,
    updateUserAuthorized
}

async function getUserManagement(email?: string, cursor?: string, limit: number = 10) {
    const db = await prisma.user.findMany({
        ...(email && {
            where: {
                email: {
                    contains: email
                }
            }
        }),
        take: limit,
        ...(cursor && {
            cursor: {
                id: cursor
            }
        }),
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            role: true,
            status: true,
            email: true,
            name: true,
            imageUrl: true
        }
    })
    if (!db) {
        return { success: false }
    }
    return { success: true, data: db }
}

async function userInitializeSession(clerkId: string) {
    const db = await prisma.user.findUnique({
        where: {
            clerkId: clerkId
        }, select: {
            role: true,
            id: true,
            name: true,
            bannedCode: true,
            status: true
            // initalize impoertant field
        }
    })
    if (!db) {
        return { success: false }
    }
    return { success: true, data: db }
}

async function userCreate(input: UserCreatedInput) {
    const db = await prisma.user.upsert({
        where: {
            email: input.email,
        },
        update: {
            clerkId: input.clerkId,
            email: input.email,
            name: input.username,
            imageUrl: input.imageUrl,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
            status: 'ACTIVE'
        },
        create: {
            clerkId: input.clerkId,
            email: input.email,
            name: input.username,
            imageUrl: input.imageUrl,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        },
        select: {
            role: true,
            clerkId: true,
            id: true,
            bannedCode: true,
            status: true
        }
    })
    if (!db) {
        return { success: false }
    }
    return { success: true, data: db }
}


async function userUpdate(input: UserUpdatedInput) {
    const db = await prisma.user.upsert({
        where: {
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
        },
        select: {
            role: true,
            clerkId: true,
            id: true,
            bannedCode: true,
            status: true
        }
    })
    if (!db) {
        return { success: false }
    }
    return { success: true, data: db }
}

async function userDelete(input: UserDeletedInput) {
    const db = await prisma.user.update({
        where: {
            clerkId: input.clerkId,
        },
        data: {
            status: 'DELETED',
            deletedAt: new Date(),
        }
    })
    if (!db) {
        // tech Debt
        return { success: true }
    }
    return { success: true }
}

async function updateUserStatus(userId: string, statusTo: TUserStatus) {
    const db = await prisma.$transaction(async tx => {
        const user = await tx.user.update({
            where: {
                id: userId
            },
            data: {
                status: statusTo
            },
            select: {
                role: true,
                clerkId: true,
                id: true,
                bannedCode: true,
                status: true
            }
        })
        return user
    })
    if (!db) {
        return { success: false }
    }
    return { success: true, data: db }
}
async function updateUserAuthorized(userId: string, statusTo: TUserStatus, roleTo: TUserRole) {
    const db = await prisma.$transaction(async tx => {
        const user = await tx.user.update({
            where: {
                id: userId
            },
            data: {
                status: statusTo,
                role: roleTo
            },
            select: {
                role: true,
                clerkId: true,
                id: true,
                bannedCode: true,
                status: true
            }
        })
        return user
    })
    if (!db) {
        return { success: false }
    }
    return { success: true, data: db }
}