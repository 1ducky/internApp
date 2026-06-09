import { logger } from "@/infrastructure/lib/logger";
import { recapRepository } from "./recap.repository";

export const recapService = {
    DailyRecapPost,
    DailyRecapUser,
}

async function DailyRecapPost(recapAt: Date) {
    logger.info(`Starting Daily Recap Post`, 'Recap Service: DailyRecapPost');

    const startOfDay = new Date(recapAt);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const start = new Date(startOfDay.getTime());

    const endOfDay = new Date(recapAt);
    endOfDay.setUTCHours(23, 59, 59, 999);
    const end = new Date(endOfDay.getTime());

    const postTotal = await recapRepository.DailyRecapPost(start, end);
    return { postTotal, recapAt: start }

}
async function DailyRecapUser(recapAt: Date) {
    logger.info(`Starting Daily Recap User`, 'Recap Service: DailyRecapUser');

    const startOfDay = new Date(recapAt);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const start = new Date(startOfDay.getTime());

    const endOfDay = new Date(recapAt);
    endOfDay.setUTCHours(23, 59, 59, 999);
    const end = new Date(endOfDay.getTime());

    const userTotal = await recapRepository.DailyRecapUser(start, end);
    return { userTotal, recapAt: start }

}