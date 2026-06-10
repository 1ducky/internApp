import { RecaptDto } from "@/services/recap/recap.dto";
import { PALETTE } from "./static.data";

export default function StatCard({
    label,
    data,
    metricKey,
}: {
    label: string;
    data: RecaptDto[];
    metricKey: string;
}) {
    const total = data.reduce((s, d) => s + d.value, 0);
    const latest = data[data.length - 1]?.value ?? 0;
    const prev = data[data.length - 2]?.value ?? 0;
    const diff = latest - prev;
    const pct = prev === 0 ? 0 : Math.round((diff / prev) * 100);
    const pal = PALETTE[metricKey] ?? {
        stroke: "#fff",
        accent: "rgba(255,255,255,0.4)",
        badge: "border-white/20"
    };

    /* mini sparkline */
    const W = 80;
    const H = 32;
    const vals = data.map((d) => d.value);
    const maxV = Math.max(...vals, 1);
    const pts = vals.length === 0
        ? ""
        : vals.length === 1
            ? `0,${H} ${W},${H}`  // flat line
            : vals.map((v, i) =>
                `${(i / (vals.length - 1)) * W},${H - (v / maxV) * H}`
            ).join(" ");

    return (
        <div
            className="relative rounded-2xl p-5 border overflow-hidden bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800/80"
        >
            {/* glow */}
            <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20"
            />
            <div className="flex items-start justify-between mb-3">
                <div>
                    <p className="text-xs font-medium dark:text-white/40 text-black uppercase tracking-widest mb-1">
                        {label}
                    </p>
                    <p className="text-3xl font-bold text-black dark:text-white">{total}</p>
                </div>
                <svg viewBox={`0 0 ${W} ${H}`} className="w-20 h-8 opacity-70">
                    <polyline
                        points={pts}
                        fill="none"
                        stroke={pal.stroke}
                        strokeWidth="5"
                        strokeLinejoin="bevel"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
            <div className="flex items-center gap-2">
                <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${pal.badge}`}
                >
                    {diff >= 0 ? "▲" : "▼"} {Math.abs(pct)}%
                </span>
                <span className="text-xs dark:text-white/30 text-black/">vs kemarin</span>
            </div>
        </div>
    );
}
