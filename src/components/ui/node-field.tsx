"use client";

import { useEffect, useRef } from "react";

const NODES = [
  { x: 60, y: 80, label: "API" },
  { x: 220, y: 40, label: "Go" },
  { x: 340, y: 130, label: "React" },
  { x: 120, y: 220, label: "DB" },
  { x: 280, y: 260, label: "LLM" },
  { x: 420, y: 60, label: "TS" },
  { x: 400, y: 220, label: "WS" },
  { x: 40, y: 300, label: "Auth" },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [2, 5],
  [2, 6],
  [3, 7],
  [1, 5],
  [4, 6],
];

export function NodeField() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const el = wrapperRef.current;
    if (!el) return;

    function handleMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      el!.style.setProperty("--tilt-x", `${relY * -4}deg`);
      el!.style.setProperty("--tilt-y", `${relX * 4}deg`);
    }

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-3/5 items-center justify-center overflow-hidden opacity-[0.35] lg:flex dark:opacity-[0.25]"
      style={{
        transform:
          "perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
        transition: "transform 0.4s ease-out",
      }}
    >
      <svg
        viewBox="0 0 460 340"
        className="h-full w-full max-w-2xl"
        fill="none"
      >
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        ))}
        {NODES.map((node, i) => (
          <g key={i}>
            <circle
              cx={node.x}
              cy={node.y}
              r="4"
              fill="var(--accent)"
              className="motion-safe:animate-pulse"
              style={{ animationDelay: `${i * 0.3}s`, animationDuration: "3s" }}
            />
            <text
              x={node.x + 10}
              y={node.y + 4}
              fontSize="10"
              fontFamily="var(--font-mono)"
              fill="var(--foreground)"
              opacity="0.6"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
