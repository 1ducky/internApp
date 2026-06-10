export function StatisticHeader({ backDay }: { backDay: number }) {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    📊 Recap Harian
                </h1>
                <p className="text-sm text-white/40 mt-1">
                    Data {backDay} hari terakhir
                </p>
            </div>
        </>
    )
}