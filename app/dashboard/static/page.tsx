import { getRecapCache } from "@/services/recap/recap.cache";
import { getDateRangeByDays } from "@/utils/date/dateRange";
import RecapCsr from "./csr";

export default async function StaticPage() {
    const { end, start } = getDateRangeByDays(14, new Date())
    const res = await getRecapCache.RecapCache(start, end, undefined)()

    return (
        <>
            <div className="min-h-screen bg-[#080810] text-white px-4 py-8 md:px-10">
                <RecapCsr res={res} />
            </div>
        </>
    )

}