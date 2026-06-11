"use client";

import { useState } from "react";
import { PALETTE } from "./static.data";
import { RecaptDto } from "@/services/recap/recap.dto";
import useIsDarkTheme from "@/hooks/UI/useIsDark";

// Maximum number of visible slots (adjust as needed)


export default function LineChart({
    data,
    metricKey,
    backDay
}: {
    data: RecaptDto[];
    metricKey: string;
    backDay: number
}) {
    const [hovered, setHovered] = useState<number | null>(null);
    const isDark = useIsDarkTheme()
    const MAX_SLOTS = backDay;

    const W = 560;
    const H = 200;
    const PAD = { top: 20, right: 24, bottom: 40, left: 40 };

    const chartW = W - PAD.left - PAD.right;
    const chartH = H - PAD.top - PAD.bottom;

    // Use at most MAX_SLOTS recent entries, already right-aligned
    const slotCount = MAX_SLOTS;
    const slotWidth = chartW / (slotCount - 1);

    // Take only the last MAX_SLOTS items; oldest first
    const trimmed = data.slice(-MAX_SLOTS).reverse();

    const values = trimmed.map((d) => d.value);
    const hasData = values.length > 0;

    const maxV = hasData ? Math.max(...values, 1) : 1;
    const minV = hasData ? Math.min(...values) : 0;
    const range = maxV - minV || 1;

    // Map index in `trimmed` to an x position, anchored from the RIGHT
    // Index 0 in trimmed = oldest = left side of occupied segment
    // Index trimmed.length-1 = newest = rightmost (W - PAD.right)
    const px = (i: number) => {
        const slotFromRight = trimmed.length - 1 - i; // 0 = rightmost
        return PAD.left + chartW - slotFromRight * slotWidth;
    };

    const py = (v: number) =>
        PAD.top + (1 - (v - minV) / range) * chartH;

    const pal = PALETTE[metricKey];
    const gradId = `grad-${metricKey}`;

    const points = hasData
        ? trimmed.map((d, i) => `${px(i)},${py(d.value)}`).join(" ")
        : "";

    const areaPath = hasData
        ? `M ${px(0)},${py(trimmed[0].value)} ` +
        trimmed.map((d, i) => `L ${px(i)},${py(d.value)}`).join(" ") +
        ` L ${px(trimmed.length - 1)},${H - PAD.bottom}` +
        ` L ${px(0)},${H - PAD.bottom} Z`
        : "";

    return (
        <>
            {/* Definisikan CSS vars berdasarkan dark/light mode */}
            <svg
                viewBox={`0 0 ${W} ${H}`}
                className="w-full h-full"
                style={{ overflow: "visible" }}
                onMouseLeave={() => setHovered(null)}
            >
                <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={pal.stroke} stopOpacity="0.35" />
                        <stop offset="100%" stopColor={pal.stroke} stopOpacity="0" />
                    </linearGradient>
                    <filter id={`glow-${metricKey}`}>
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((t) => {
                    const y = PAD.top + t * chartH;
                    const val = Math.round(maxV - t * range);
                    return (
                        <g key={t}>
                            <line
                                x1={PAD.left}
                                x2={W - PAD.right}
                                y1={y}
                                y2={y}
                                stroke="currentColor"
                                strokeWidth="1"
                                className="text-zinc-200 dark:text-white/6"
                            />
                            <text
                                x={PAD.left - 6}
                                y={y + 4}
                                textAnchor="end"
                                fontSize="10"
                                className="fill-zinc-400 dark:fill-white/30"
                            >
                                {val}
                            </text>
                        </g>
                    );
                })}

                {/* Empty state */}
                {!hasData && (
                    <line
                        x1={PAD.left}
                        x2={W - PAD.right}
                        y1={PAD.top + chartH}
                        y2={PAD.top + chartH}
                        stroke={pal.stroke}
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        opacity="0.3"
                    />
                )}

                {hasData && (
                    <>
                        <path d={areaPath} fill={pal.fill} />

                        <polyline
                            points={points}
                            fill="none"
                            stroke={pal.stroke}
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            filter={`url(#glow-${metricKey})`}
                        />

                        {trimmed.length < MAX_SLOTS && (
                            <line
                                x1={PAD.left}
                                x2={px(0)}
                                y1={PAD.top + chartH}
                                y2={PAD.top + chartH}
                                stroke={pal.stroke}
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                                opacity="0.25"
                            />
                        )}

                        {trimmed.map((d, i) => (
                            <g
                                key={i}
                                onMouseEnter={() => setHovered(i)}
                                style={{ cursor: "pointer" }}
                            >
                                <rect
                                    x={px(i) - 20}
                                    y={PAD.top}
                                    width={40}
                                    height={chartH}
                                    fill="transparent"
                                />
                                <circle
                                    cx={px(i)}
                                    cy={py(d.value)}
                                    r={hovered === i ? 6 : 4}
                                    fill={hovered === i ? (isDark ? "#fff" : "#1a1a1a") : pal.stroke}
                                    stroke={pal.stroke}
                                    strokeWidth="2"
                                    style={{ transition: "r 0.15s" }}
                                />
                                {hovered === i && (
                                    <g>
                                        <rect
                                            x={px(i) - 26}
                                            y={py(d.value) - 36}
                                            width={52}
                                            height={26}
                                            rx="6"
                                            fill="currentColor"
                                            stroke={pal.stroke}
                                            strokeWidth="1"
                                            className="text-white dark:text-zinc-950"
                                        />
                                        <text
                                            x={px(i)}
                                            y={py(d.value) - 18}
                                            textAnchor="middle"
                                            fontSize="11"
                                            fontWeight="600"
                                            className="fill-zinc-900 dark:fill-white"
                                        >
                                            {d.value}
                                        </text>
                                    </g>
                                )}
                                <text
                                    x={px(i)}
                                    y={H - PAD.bottom + 18}
                                    textAnchor="middle"
                                    fontSize="10"
                                    className="fill-zinc-400 dark:fill-white/40"
                                >
                                    {new Date(d.recapAt).toISOString().split("T")[0]}
                                </text>
                            </g>
                        ))}
                    </>
                )}
            </svg>
        </>
    );
}