import { logger } from "@/infrastructure/lib/logger";
import { recapRepository } from "./recap.repository";
import { getHourRange } from "@/utils/date/dateRange";
import { RecapType } from "@/generated/prisma/enums";
import { toRecapDto } from "./recap.dto";


export const recapService = {
    DailyRecapPost,
    DailyRecapUser,
    getRecap
}

async function DailyRecapPost(recapAt: Date) {
    logger.info(`Starting Daily Recap Post`, 'Recap Service: DailyRecapPost');

    const { start, end } = getHourRange(recapAt)

    const postTotal = await recapRepository.DailyRecapPost(start, end);
    return { postTotal, recapAt: start }

}
async function DailyRecapUser(recapAt: Date) {
    logger.info(`Starting Daily Recap User`, 'Recap Service: DailyRecapUser');

    const { start, end } = getHourRange(recapAt)

    const userTotal = await recapRepository.DailyRecapUser(start, end);
    return { userTotal, recapAt: start }

}

async function getRecap(start: Date, end: Date, type?: RecapType) {
    logger.info(`Getting Recap`, 'Recap Service: getRecap');
    const recap = await recapRepository.getRecap(start, end, type)
    return toRecapDto(recap)
}