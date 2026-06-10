'use client'
import { StatView } from "@/component/statistic/static.chartView";
import { ChartType } from "@/component/statistic/static.data";
import DataTable from "@/component/statistic/static.dataTable";
import { StatisticHeader } from "@/component/statistic/static.header";
import StatCard from "@/component/statistic/static.statCard";
import { GrupedRecap, Metrickey } from "@/services/recap/recap.dto";
import { ChartColumnBig, ChartLine } from "lucide-react";
import { useState } from "react";

export default function RecapCsr({ res, backDay }: { res: GrupedRecap, backDay: number }) {
    const matricKey = Object.keys(res) as Metrickey[]
    const [activeMetric, setActiveMetric] = useState<Metrickey>(matricKey[0])

    const [chartType, setChartType] = useState<ChartType>("line");

    const data = res[activeMetric] ?? [];

    const total = data?.reduce((s, d) => s + d.value, 0) ?? 0;
    const avg = (total / backDay).toFixed(1);
    const peak = data?.length === 0 ? 0 : Math.max(...(data?.map((d) => d.value) ?? [0]));

    return (
        <>
            {/* Header */}
            <StatisticHeader backDay={backDay} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {matricKey.map((key, i) => (
                    <StatCard
                        key={i}
                        label={key}
                        data={res[key] || []}
                        metricKey={key}
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
                        {matricKey.map((key, i) => {
                            const active = activeMetric === key;
                            return (
                                <button
                                    key={i}
                                    onClick={() => setActiveMetric(key)}
                                    className={`
                                    flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                                    transition-all duration-200 border
                                    ${active
                                            ? "bg-white dark:bg-white/10 border-zinc-200 dark:border-white/15 text-zinc-900 dark:text-white"
                                            : "bg-transparent border-transparent text-zinc-400 dark:text-white/40 hover:text-zinc-700 dark:hover:text-white/70"
                                        }
  `}

                                >
                                    <span className="capitalize dark:text-white text-black">{key}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Chart type toggle */}
                    <div className="flex rounded-xl p-1 gap-1 bg-zinc-100 dark:bg-white/6">
                        {(["line", "bar"] as ChartType[]).map((t) => (
                            <button
                                key={t}
                                onClick={() => setChartType(t)}
                                className={`
                                    px-3 py-1.5 rounded-lg text-xs font-medium
                                    transition-all duration-200 capitalize
                                    ${chartType === t
                                        ? "bg-white dark:bg-white/12 text-zinc-900 dark:text-white shadow-sm"
                                        : "bg-transparent text-zinc-400 dark:text-white/40 hover:text-zinc-600 dark:hover:text-white/60"
                                    }
                                `}
                            >
                                {t === "line"
                                    ? <div className="flex items-center gap-1.5"><ChartLine size={20} /> Garis</div>
                                    : <div className="flex items-center gap-1.5"><ChartColumnBig size={20} /> Bar</div>
                                }
                            </button>
                        ))}
                    </div>

                </div>


                {/* Quick stats row */}
                <div className="flex gap-6 mb-6">
                    {[
                        { label: "Total 7 Hari", value: total },
                        { label: "Rata-rata / Hari", value: avg },
                        { label: "Puncak", value: peak },
                    ].map((s) => (
                        <div key={s.label}>
                            <p className="text-xs dark:text-white/30 text-zinc-600 mb-0.5">{s.label}</p>
                            <p
                                className="text-xl font-bold"
                            >
                                {s.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Chart */}
                {data && data.length !== 0 &&
                    <StatView chartType={chartType} data={data} metricKey={activeMetric} backDay={backDay} />
                }

            </div>
            <DataTable data={data ?? []} activeMetric={activeMetric} />
        </>
    )
}