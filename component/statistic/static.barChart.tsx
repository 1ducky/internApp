"use client";

import { useState } from "react";
import { DataPoint, PALETTE } from "./static.data";

export default function BarChart({
    data,
    metricKey,
}: {
    data: DataPoint[];
    metricKey: string;
}) {
    const [hovered, setHovered] = useState<number | null>(null);
    const W = 560;
    const H = 200;
    const PAD = { top: 20, right: 24, bottom: 40, left: 40 };
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;

    const maxV = Math.max(...data.map((d) => d.value), 1);
    const barW = innerW / data.length;
    const gap = barW * 0.3;
    const pal = PALETTE[metricKey];

    return (
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
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="1"
                        />
                        <text
                            x={PAD.left - 6}
                            y={y + 4}
                            textAnchor="end"
                            fontSize="10"
                            fill="rgba(255,255,255,0.3)"
                        >
                            {Math.round(maxV * (1 - t))}
                        </text>
                    </g>
                );
            })}

            {data.map((d, i) => {
                const bh = (d.value / maxV) * innerH;
                const bx = PAD.left + i * barW + gap / 2;
                const by = PAD.top + innerH - bh;
                const bwFinal = barW - gap;
                return (
                    <g
                        key={i}
                        onMouseEnter={() => setHovered(i)}
                        style={{ cursor: "pointer" }}
                    >
                        <rect
                            x={bx}
                            y={by}
                            width={bwFinal}
                            height={bh}
                            rx={4}
                            fill={`url(#bgrad-${metricKey})`}
                            opacity={hovered === null || hovered === i ? 1 : 0.4}
                            style={{ transition: "opacity 0.2s" }}
                        />
                        {hovered === i && (
                            <g>
                                <rect
                                    x={bx + bwFinal / 2 - 20}
                                    y={by - 30}
                                    width={40}
                                    height={22}
                                    rx="5"
                                    fill="rgba(15,15,30,0.92)"
                                    stroke={pal.stroke}
                                    strokeWidth="1"
                                />
                                <text
                                    x={bx + bwFinal / 2}
                                    y={by - 14}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#fff"
                                    fontWeight="600"
                                >
                                    {d.value}
                                </text>
                            </g>
                        )}
                        <text
                            x={bx + bwFinal / 2}
                            y={H - PAD.bottom + 18}
                            textAnchor="middle"
                            fontSize="10"
                            fill="rgba(255,255,255,0.4)"
                        >
                            {d.date}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}
