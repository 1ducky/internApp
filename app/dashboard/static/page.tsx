import { getRecapCache } from "@/services/recap/recap.cache";
import { getDateRangeByDays } from "@/utils/date/dateRange";
import RecapCsr from "./csr";
import { authService } from "@/services/auth/auth.service";
import { forbidden, unauthorized } from "next/navigation";
import { hasPermission } from "@/services/auth/auth.client";

export default async function StaticPage() {
    const user = await authService.getSession()
    if (!user) return unauthorized()
    if (!hasPermission(user.role, "read:recap")) return forbidden()

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