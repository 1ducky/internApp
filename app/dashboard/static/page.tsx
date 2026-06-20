import { getRecapCache } from "@/services/recap/recap.cache";
import { getDateRangeByDays } from "@/utils/date/dateRange";
import RecapCsr from "./csr";
import { AuthGuard } from "@/services/auth/auth.helper";
import { forbidden, unauthorized } from "next/navigation";

export default async function StaticPage() {
    const auth = await AuthGuard({ role: ['ADMIN'], permissions: ['read:recap'], onForbidden: () => forbidden(), onUnauthorized: () => unauthorized() })

    if (!auth.success || !auth.data) {
        throw new Error("Something went wrong")
    }


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