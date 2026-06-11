"use client";

import { useState } from "react";
import { PALETTE } from "./static.data";
import { RecaptDto } from "@/services/recap/recap.dto";

export default function BarChart({
    data,
    metricKey,
    backDay
}: {
    data: RecaptDto[];
    metricKey: string;
    backDay: number
}) {
    const [hovered, setHovered] = useState<number | null>(null);
    const MAX_SLOTS = backDay;

    const W = 560;
    const H = 200;
    const PAD = { top: 20, right: 24, bottom: 40, left: 40 };
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;

    // Sort oldest → newest, take last MAX_SLOTS
    const trimmed = data
        .slice(-MAX_SLOTS)
        .sort((a, b) => new Date(a.recapAt).getTime() - new Date(b.recapAt).getTime());

    // Build full MAX_SLOTS array: phantom nulls on left, real data on right
    type Slot = { value: number; label: string | null };
    const emptyCount = MAX_SLOTS - trimmed.length;
    const allSlots: Slot[] = [
        ...Array.from({ length: emptyCount }, (): Slot => ({ value: 0, label: null })),
        ...trimmed.map((d): Slot => ({
            value: d.value,
            label: new Date(d.recapAt).toISOString().split("T")[0],
        })),
    ];

    const maxV = Math.max(...trimmed.map((d) => d.value), 1);
    const barW = innerW / MAX_SLOTS;
    const gap = barW * 0.3;
    const bwFinal = barW - gap;
    const pal = PALETTE[metricKey];

    return (
        <>
            <svg
                viewBox={`0 0 ${W} ${H}`}
                className="w-full h-full"
                style={{ overflow: "visible" }}
                onMouseLeave={() => setHovered(null)}
            >
                <defs>
                    <linearGradient id={`bgrad-${metricKey}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={pal.stroke} stopOpacity="0.9" />
                        <stop offset="100%" stopColor={pal.stroke} stopOpacity="0.3" />
                    </linearGradient>
                </defs>

                {/* Grid */}
                {[0, 0.25, 0.5, 0.75, 1].map((t) => {
                    const y = PAD.top + t * innerH;
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
                                {Math.round(maxV * (1 - t))}
                            </text>
                        </g>
                    );
                })}

                {allSlots.map((s, i) => {
                    const bh = (s.value / maxV) * innerH;
                    const bx = PAD.left + i * barW + gap / 2;
                    const by = PAD.top + innerH - bh;
                    const isPhantom = s.label === null;
                    const isHovered = hovered === i;

                    return (
                        <g
                            key={i}
                            onMouseEnter={() => !isPhantom && setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            style={{ cursor: isPhantom ? "default" : "pointer" }}
                        >
                            {!isPhantom && (
                                <rect
                                    x={bx}
                                    y={by}
                                    width={bwFinal}
                                    height={bh}
                                    rx={4}
                                    fill={`url(#bgrad-${metricKey})`}
                                    opacity={hovered === null || isHovered ? 1 : 0.4}
                                    style={{ transition: "opacity 0.2s" }}
                                />
                            )}

                            {/* Tooltip */}
                            {isHovered && !isPhantom && (
                                <g>
                                    <rect
                                        x={bx + bwFinal / 2 - 20}
                                        y={by - 30}
                                        width={40}
                                        height={22}
                                        rx="5"
                                        fill="currentColor"
                                        stroke={pal.stroke}
                                        strokeWidth="1"
                                        className="text-white dark:text-zinc-950"
                                    />
                                    <text
                                        x={bx + bwFinal / 2}
                                        y={by - 14}
                                        textAnchor="middle"
                                        fontSize="11"
                                        fontWeight="600"
                                        className="fill-zinc-900 dark:fill-white"
                                    >
                                        {s.value}
                                    </text>
                                </g>
                            )}

                            {/* X label */}
                            {!isPhantom && (
                                <text
                                    x={bx + bwFinal / 2}
                                    y={H - PAD.bottom + 18}
                                    textAnchor="middle"
                                    fontSize="10"
                                    className="fill-zinc-400 dark:fill-white/40"
                                >
                                    {s.label}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>
        </>
    );
}