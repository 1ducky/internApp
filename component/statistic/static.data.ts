/* ─── Shared Types & Data for Static Dashboard ──────────── */

import { Metrickey } from "@/services/recap/recap.dto";

export type DataPoint = {
    name: string;
    value: number;
    date: string;
};

export type PaletteEntry = {
    stroke: string;
    fill: string;
    accent: string;
    badge: string;
};

/* ─── Color palette per metric ──────────────────────────── */
export const PALETTE: Record<string, PaletteEntry> = {
    POST: {
        stroke: "#818cf8",
        fill: "url(#grad-post)",
        accent: "#6366f1",
        badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    },
    USER: {
        stroke: "#34d399",
        fill: "url(#grad-user)",
        accent: "#10b981",
        badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    },
    application: {
        stroke: "#f472b6",
        fill: "url(#grad-application)",
        accent: "#ec4899",
        badge: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    },
};

/* ─── Dummy data generator ──────────────────────────────── */
const today = new Date();
const fmt = (d: Date) =>
    d.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });

const generateWeek = (
    name: string,
    base: number,
    variance: number
): DataPoint[] =>
    Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (6 - i));
        return {
            name,
            value: Math.max(0, base + Math.round((Math.random() - 0.4) * variance)),
            date: fmt(d),
        };
    });

export const DATASETS: Record<string, DataPoint[]> = {
    post: generateWeek("post", 24, 20),
    user: generateWeek("user", 14, 12),
    application: generateWeek("application", 38, 30),
};


export type ChartType = "line" | "bar"; //a

export const METRICS: { key: Metrickey; label: string; icon: string }[] = [
    { key: "POST", label: "Post", icon: "📝" },
    { key: "USER", label: "User", icon: "👤" },
];