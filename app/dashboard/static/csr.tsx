'use client'

import BarChart from "@/component/statistic/static.barChart";
import { ChartType } from "@/component/statistic/static.data";
import DataTable from "@/component/statistic/static.dataTable";
import LineChart from "@/component/statistic/static.lineChart";
import StatCard from "@/component/statistic/static.statCard";
import { GrupedRecap } from "@/services/recap/recap.dto";
import { useState } from "react";

export default function RecapCsr({ res }: { res: GrupedRecap }) {
    const [activeMetric, setActiveMetric] = useState<keyof GrupedRecap>(Object.keys(res)[0] as keyof GrupedRecap)
    const [chartType, setChartType] = useState<ChartType>("line");

    const data = res[activeMetric];

    const total7 = data?.reduce((s, d) => s + d.value, 0) ?? 0;
    const avg = (total7 / 7).toFixed(1);
    const peak = Math.max(...(data?.map((d) => d.value) ?? [0])) ?? 0;
    return (
        <>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    📊 Dashboard Statistik
                </h1>
                <p className="text-sm text-white/40 mt-1">
                    Data 7 hari terakhir · Diperbarui hari ini
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {Object.entries(res).map(([type, data]) => (
                    <StatCard
                        key={type}
                        label={type}
                        data={data}
                        metricKey={type}
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
                {/* panel header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                    {/* Metric tabs */}
                    <div
                        className="flex rounded-xl p-1 gap-1"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                        {Object.entries(res).map(([key, value]) => {
                            const active = activeMetric === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveMetric(key as keyof GrupedRecap)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                                    style={{
                                        background: active ? "rgba(255,255,255,0.12)" : "transparent",
                                        color: active ? "#fff" : "rgba(255,255,255,0.4)",
                                        boxShadow: "none",
                                    }}
                                >
                                    <span className="capitalize">{key}</span>
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
                            >
                                {s.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Chart */}
                {data &&
                    <div className="h-52 w-full">
                        {chartType === "line" ? (
                            <LineChart data={data} metricKey={activeMetric} />
                        ) : (
                            <BarChart data={data} metricKey={activeMetric} />
                        )}
                    </div>
                }

            </div>
            <DataTable data={data ?? []} activeMetric={activeMetric} />
        </>
    )
}