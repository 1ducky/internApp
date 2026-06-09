import { DataPoint, PALETTE, MetricKey, METRICS } from "./static.data";

export default function DataTable({
    data,
    activeMetric,
}: {
    data: DataPoint[];
    activeMetric: MetricKey;
}) {
    const pal = PALETTE[activeMetric as string];

    return (
        <div
            className="mt-6 rounded-2xl border overflow-hidden"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
            <div
                className="px-6 py-3 border-b"
                style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.07)",
                }}
            >
                <p className="text-sm font-medium text-white/60">
                    Rincian Data · {METRICS.find((m) => m.key === activeMetric)?.label}
                </p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                            {["Tanggal", "Metrik", "Nilai", "Perubahan"].map((h) => (
                                <th
                                    key={h}
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-widest text-white/30"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[...data].reverse().map((d, i) => {
                            const idx = data.length - 1 - i;
                            const prev = data[idx - 1];
                            const diff = prev ? d.value - prev.value : null;
                            return (
                                <tr
                                    key={i}
                                    className="border-t transition-colors hover:bg-white/[0.02]"
                                    style={{ borderColor: "rgba(255,255,255,0.05)" }}
                                >
                                    <td className="px-6 py-3 text-white/50">{d.date}</td>
                                    <td className="px-6 py-3">
                                        <span
                                            className={`text-xs px-2 py-0.5 rounded-full border ${pal.badge}`}
                                        >
                                            {d.name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 font-semibold text-white">
                                        {d.value}
                                    </td>
                                    <td className="px-6 py-3">
                                        {diff !== null ? (
                                            <span
                                                className={`text-xs font-medium ${diff > 0
                                                    ? "text-emerald-400"
                                                    : diff < 0
                                                        ? "text-red-400"
                                                        : "text-white/30"
                                                    }`}
                                            >
                                                {diff > 0 ? "▲" : diff < 0 ? "▼" : "—"}{" "}
                                                {Math.abs(diff)}
                                            </span>
                                        ) : (
                                            <span className="text-white/20 text-xs">—</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
