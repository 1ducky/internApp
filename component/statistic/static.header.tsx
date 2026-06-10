import { ChartNoAxesCombined } from "lucide-react";

export function StatisticHeader({ backDay }: { backDay: number }) {
    return (
        <>
            <div className="mb-8">
                <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold dark:text-white tracking-tight">
                    <ChartNoAxesCombined size={30} /> Recap Harian
                </h1>
                <p className="text-sm text-white/40 mt-1">
                    Data {backDay} hari terakhir
                </p>
            </div>
        </>
    )
}