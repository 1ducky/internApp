'use client';

import { FileText, Eye, Heart } from "lucide-react";

export interface ProfileStatsProps {
    totalPosts: number;
    engagementRate: number; // percentage
}

export default function ProfileStats({ stats }: { stats: ProfileStatsProps }) {
    const items = [
        {
            label: "Total Postingan",
            value: stats.totalPosts,
            icon: FileText,
            color: "text-indigo-600 dark:text-indigo-400",
            bg: "bg-indigo-50 dark:bg-indigo-950/40",
            border: "border-indigo-100 dark:border-indigo-900/30"
        },
        {
            label: "Total Dilihat",
            icon: Eye,
            color: "text-sky-600 dark:text-sky-400",
            bg: "bg-sky-50 dark:bg-sky-950/40",
            border: "border-sky-100 dark:border-sky-900/30"
        },
        {
            label: "Tingkat Interaksi",
            value: `${stats.engagementRate}%`,
            icon: Heart,
            color: "text-rose-600 dark:text-rose-400",
            bg: "bg-rose-50 dark:bg-rose-950/40",
            border: "border-rose-100 dark:border-rose-900/30"
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {items.map((item, idx) => {
                const Icon = item.icon;
                return (
                    <div
                        key={idx}
                        className={`flex items-center gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/85 p-5 rounded-2xl shadow-xs transition-all duration-300 hover:-translate-y-0.5`}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.bg} ${item.border}`}>
                            <Icon size={20} className={item.color} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                                {item.label}
                            </p>
                            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-0.5 tracking-tight">
                                {item.value}
                            </h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
