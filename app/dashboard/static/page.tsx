"use client";

import { useState } from "react";
import { DATASETS, PALETTE, METRICS, MetricKey, ChartType } from "@/component/statistic/static.data";
import LineChart from "@/component/statistic/static.lineChart";
import BarChart from "@/component/statistic/static.barChart";
import StatCard from "@/component/statistic/static.statCard";
import DataTable from "@/component/statistic/static.dataTable";

export default function StaticDashboard() {
    const [activeMetric, setActiveMetric] = useState<MetricKey>("post");
    const [chartType, setChartType] = useState<ChartType>("line");

    const pal = PALETTE[activeMetric];
    const data = DATASETS[activeMetric];
    const total7 = data.reduce((s, d) => s + d.value, 0);
    const avg = (total7 / 7).toFixed(1);
    const peak = Math.max(...data.map((d) => d.value));

    return (
        <div className="min-h-screen bg-[#080810] text-white px-4 py-8 md:px-10">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    📊 Dashboard Statistik
                </h1>
                <p className="text-sm text-white/40 mt-1">
                    Data 7 hari terakhir · Diperbarui hari ini
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {METRICS.map((m) => (
                    <StatCard
                        key={m.key}
                        label={m.label}
                        data={DATASETS[m.key]}
                        metricKey={m.key}
                    />
                ))}
            </div>

            {/* Chart Panel */}
            <div
                className="rounded-2xl border p-6"
                style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.07)",
                }}
            >
                {/* Panel header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    {/* Metric tabs */}
                    <div
                        className="flex rounded-xl p-1 gap-1"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                        {METRICS.map((m) => {
                            const active = activeMetric === m.key;
                            return (
                                <button
                                    key={m.key}
                                    onClick={() => setActiveMetric(m.key)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                                    style={{
                                        background: active ? pal.accent : "transparent",
                                        color: active ? "#fff" : "rgba(255,255,255,0.4)",
                                        boxShadow: active
                                            ? `0 0 16px ${pal.accent}66`
                                            : "none",
                                    }}
                                >
                                    <span>{m.icon}</span>
                                    <span>{m.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Chart type toggle */}
                    <div
                        className="flex rounded-xl p-1 gap-1"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                        {(["line", "bar"] as ChartType[]).map((t) => (
                            <button
                                key={t}
                                onClick={() => setChartType(t)}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 capitalize"
                                style={{
                                    background:
                                        chartType === t
                                            ? "rgba(255,255,255,0.12)"
                                            : "transparent",
                                    color:
                                        chartType === t
                                            ? "#fff"
                                            : "rgba(255,255,255,0.4)",
                                }}
                            >
                                {t === "line" ? "📈 Line" : "📊 Bar"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quick stats row */}
                <div className="flex gap-6 mb-6">
                    {[
                        { label: "Total 7 Hari", value: total7 },
                        { label: "Rata-rata / Hari", value: avg },
                        { label: "Puncak", value: peak },
                    ].map((s) => (
                        <div key={s.label}>
                            <p className="text-xs text-white/30 mb-0.5">{s.label}</p>
                            <p
                                className="text-xl font-bold"
                                style={{ color: pal.stroke }}
                            >
                                {s.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Chart */}
                <div className="h-52 w-full">
                    {chartType === "line" ? (
                        <LineChart data={data} metricKey={activeMetric} />
                    ) : (
                        <BarChart data={data} metricKey={activeMetric} />
                    )}
                </div>
            </div>

            {/* Data Table */}
            <DataTable data={data} activeMetric={activeMetric} />
        </div>
    );
}
