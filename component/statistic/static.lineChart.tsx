"use client";

import { useState } from "react";
import { DataPoint, PALETTE } from "./static.data";

export default function LineChart({
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

    const values = data.map((d) => d.value);
    const maxV = Math.max(...values, 1);
    const minV = Math.min(...values);
    const range = maxV - minV || 1;

    const px = (i: number) =>
        PAD.left + (i / (data.length - 1)) * (W - PAD.left - PAD.right);
    const py = (v: number) =>
        PAD.top + (1 - (v - minV) / range) * (H - PAD.top - PAD.bottom);

    const points = data.map((d, i) => `${px(i)},${py(d.value)}`).join(" ");
    const areaPath = `M ${px(0)},${py(data[0].value)} ${data
        .map((d, i) => `L ${px(i)},${py(d.value)}`)
        .join(" ")} L ${px(data.length - 1)},${H - PAD.bottom} L ${px(0)},${H - PAD.bottom} Z`;

    const pal = PALETTE[metricKey];
    const gradId = `grad-${metricKey}`;

    return (
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
                const y = PAD.top + t * (H - PAD.top - PAD.bottom);
                const val = Math.round(maxV - t * range);
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
                            {val}
                        </text>
                    </g>
                );
            })}

            {/* Area fill */}
            <path d={areaPath} fill={pal.fill} />

            {/* Line */}
            <polyline
                points={points}
                fill="none"
                stroke={pal.stroke}
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                filter={`url(#glow-${metricKey})`}
            />

            {/* X-axis labels + interactive dots */}
            {data.map((d, i) => (
                <g
                    key={i}
                    onMouseEnter={() => setHovered(i)}
                    style={{ cursor: "pointer" }}
                >
                    {/* hover zone */}
                    <rect
                        x={px(i) - 20}
                        y={PAD.top}
                        width={40}
                        height={H - PAD.top - PAD.bottom}
                        fill="transparent"
                    />
                    {/* dot */}
                    <circle
                        cx={px(i)}
                        cy={py(d.value)}
                        r={hovered === i ? 6 : 4}
                        fill={hovered === i ? "#fff" : pal.stroke}
                        stroke={pal.stroke}
                        strokeWidth="2"
                        style={{ transition: "r 0.15s" }}
                    />
                    {/* tooltip */}
                    {hovered === i && (
                        <g>
                            <rect
                                x={px(i) - 26}
                                y={py(d.value) - 36}
                                width={52}
                                height={26}
                                rx="6"
                                fill="rgba(15,15,30,0.92)"
                                stroke={pal.stroke}
                                strokeWidth="1"
                            />
                            <text
                                x={px(i)}
                                y={py(d.value) - 18}
                                textAnchor="middle"
                                fontSize="11"
                                fill="#fff"
                                fontWeight="600"
                            >
                                {d.value}
                            </text>
                        </g>
                    )}
                    {/* X label */}
                    <text
                        x={px(i)}
                        y={H - PAD.bottom + 18}
                        textAnchor="middle"
                        fontSize="10"
                        fill="rgba(255,255,255,0.4)"
                    >
                        {d.date}
                    </text>
                </g>
            ))}
        </svg>
    );
}
