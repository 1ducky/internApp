import prisma from "@/libs/db"
import { ProfileInput } from "./profile.schema"

export const profileRepository = {
    getProfileByUserId,
    getPublicProfileById,
    submitProfile
}

async function getProfileByUserId(id: string) {
    const db = await prisma.userProfile.findUnique({
        where: { userId: id },
        select: {
            birthDate: true,
            bio: true,
            gender: true,
            phoneNumber: true,
            location: true,
            userName: true,
        }
    })
    if (!db) return { success: false }
    return { success: true, data: db }
}

async function getPublicProfileById(id: string) {
    const db = await prisma.user.findUnique({
        where: { id: id },
        select: {
            name: true,
            createdAt: true,
            imageUrl: true,
            profile: {
                select: {
                    userName: true,
                    bio: true,
                }
            },
            post: {
                take: 10,
                orderBy: { createdAt: 'desc' },
                where: {
                    authorId: id,
                    status: 'PUBLISHED',
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    type: true,
                    status: true,
                    slug: true,
                    viewCount: true,
                    createdAt: true,
                    assets: {
                        where: {
                            fileStatus: 'ACTIVE',
                            fileType: 'IMAGE'
                        },
                        select: {
                            id: true,
                            fileUrl: true,
                        }
                    },
                    author: {
                        select: {
                            id: true,
                            name: true,
                            imageUrl: true,
                            profile: {
                                select: {
                                    userName: true
                                }
                            }
                        }
                    }
                }
            }

        }
    })
    if (!db) return { success: false }
    return { success: true, data: db }
}

const parseDate = (date: string | null | undefined) => {
    return date ? new Date(date) : null
}

async function submitProfile(id: string, data: ProfileInput) {
    const db = await prisma.userProfile.upsert({
        where: { userId: id },
        update: {
            birthDate: parseDate(data.birthDate),
            userName: data.userName ?? undefined,
            bio: data.bio,
            gender: data.gender,
            phoneNumber: data.phoneNumber,
            location: data.location
        },
        create: {
            userId: id,
            birthDate: parseDate(data.birthDate),
            userName: data.userName ?? '',
            bio: data.bio,
            gender: data.gender,
            phoneNumber: data.phoneNumber,
            location: data.location
        }
    })
    if (!db) return { success: false }
    return { success: true, data: db }
}