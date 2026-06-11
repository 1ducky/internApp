import { Metrickey, RecaptDto, } from "@/services/recap/recap.dto";
import { PALETTE, METRICS } from "./static.data";

export default function DataTable({
    data,
    activeMetric,
}: {
    data: RecaptDto[];
    activeMetric: Metrickey;
}) {
    const pal = PALETTE[activeMetric as string];

    return (
        <div className="mt-6 rounded-2xl border overflow-hidden border-zinc-200 dark:border-white/[0.07]">
            <div className="px-6 py-3 border-b bg-zinc-50 dark:bg-white/[0.03] border-zinc-200 dark:border-white/[0.07]">
                <p className="text-sm font-medium text-zinc-500 dark:text-white/60">
                    Rincian Data · {METRICS.find((m) => m.key === activeMetric)?.label}
                </p>
            </div>

            {data.length !== 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-zinc-50/50 dark:bg-white/[0.02]">
                                {["Tanggal", "Metrik", "Nilai", "Perubahan"].map((h) => (
                                    <th
                                        key={h}
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-white/30"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[...data].map((d, i) => {
                                const idx = data.length - 1 - i;
                                const prev = data[idx - 1];
                                const diff = prev ? d.value - prev.value : null;
                                return (
                                    <tr
                                        key={i}
                                        className="border-t border-zinc-100 dark:border-white/[0.05] transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.02]"
                                    >
                                        <td className="px-6 py-3 text-zinc-400 dark:text-white/50">
                                            {new Date(d.recapAt).toISOString().split("T")[0]}
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className={`text-xs px-2 py-0.5 rounded-full border ${pal.badge}`}>
                                                {d.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 font-semibold text-zinc-900 dark:text-white">
                                            {d.value}
                                        </td>
                                        <td className="px-6 py-3">
                                            {diff !== null ? (
                                                <span
                                                    className={`text-xs font-medium ${diff > 0
                                                        ? "text-emerald-600 dark:text-emerald-400"
                                                        : diff < 0
                                                            ? "text-red-500 dark:text-red-400"
                                                            : "text-zinc-400 dark:text-white/30"
                                                        }`}
                                                >
                                                    {diff > 0 ? "▲" : diff < 0 ? "▼" : "—"}{" "}
                                                    {Math.abs(diff)}
                                                </span>
                                            ) : (
                                                <span className="text-zinc-300 dark:text-white/20 text-xs">—</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex justify-center items-center h-64">
                    <p className="text-zinc-400 dark:text-white/50 text-sm">Tidak ada data</p>
                </div>
            )}
        </div>
    );
}
