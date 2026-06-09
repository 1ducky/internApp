import prisma from "@/libs/db"

export const recapRepository = {

}

async function DailyRecapPost(start: Date, end: Date) {
    const db = await prisma.post.count({
        where: {
            createdAt: {
                gte: start,
                lte: end,

            }
        }
    })

}