import { getRecapCache } from "@/services/recap/recap.cache";
import { getDateRangeByDays } from "@/utils/date/dateRange";
import RecapCsr from "./csr";

export default async function StaticPage() {
    const backDay = 7
    const { end, start } = getDateRangeByDays(backDay, new Date())
    const res = await getRecapCache.RecapCache(start, end, undefined)()

    return (
        <>
            <div className="min-h-screen dark:bg-[#080810] bg-white dark:text-white px-4 py-8 md:px-10">
                <RecapCsr res={res} backDay={backDay} />
            </div>
        </>
    )

}