import { RecapType } from "@/generated/prisma/enums";
import { logger } from "@/infrastructure/lib/logger";
import prisma from "@/libs/db"

export const recapRepository = {
    DailyRecapPost,
    DailyRecapUser,
    getRecap
}

async function DailyRecapPost(start: Date, end: Date) {
    logger.info(`Starting Daily Recap Post`, 'Recap Repository: DailyRecapPost');
    const postCount = await prisma.post.count({
        where: {
            createdAt: {
                gte: start,
                lte: end,

            }
        }
    })
    await prisma.dailyRecap.upsert({
        where: {
            recapAt_type: {
                recapAt: start,
                type: "POST"
            }
        },
        create: {
            recapAt: start,
            type: "POST",
            total: postCount
        },
        update: {
            total: postCount
        }
    })
    return postCount

}
async function DailyRecapUser(start: Date, end: Date) {
    const userCount = await prisma.user.count({
        where: {
            createdAt: {
                gte: start,
                lte: end,

            }
        }
    })
    await prisma.dailyRecap.upsert({
        where: {
            recapAt_type: {
                recapAt: start,
                type: "USER"
            }
        },
        create: {
            recapAt: start,
            type: "USER",
            total: userCount
        },
        update: {
            total: userCount
        }
    })
    return userCount

}

async function getRecap(start: Date, end: Date, type?: RecapType) {
    const db = await prisma.dailyRecap.findMany({
        where: {
            recapAt: {
                gte: start,
                lte: end
            },
            ...(type && { type })
        },
        orderBy: {
            recapAt: 'desc'
        }
    })
    return db
}