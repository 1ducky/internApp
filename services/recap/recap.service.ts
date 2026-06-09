export const recapRepository = {
    DailyRecapPost
}

async function DailyRecapPost(recapAt: Date) {

    const startOfDay = new Date(recapAt);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const start = new Date(startOfDay.getTime());

    const endOfDay = new Date(recapAt);
    endOfDay.setUTCHours(23, 59, 59, 999);
    const end = new Date(endOfDay.getTime());

    return

}