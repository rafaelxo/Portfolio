"use client";

import { useEffect, useRef } from "react";
import { clamp, map, useScene } from "@/lib/scroll";

const START = new Date(2025, 0, 1);
const END = new Date(2028, 11, 31);
const SEMESTERS = 8;

/* Progresso do curso calculado no navegador (o site é estático; a data do build envelheceria). */
export function CourseProgress({ template }: { template: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const done = useRef(0);

  useEffect(() => {
    const now = new Date();
    done.current = clamp((now.getTime() - START.getTime()) / (END.getTime() - START.getTime()));
    const months = (now.getFullYear() - START.getFullYear()) * 12 + now.getMonth();
    label.current!.textContent = template.replace("{n}", String(Math.min(SEMESTERS, Math.floor(months / 6) + 1)));
  }, [template]);

  useScene(ref, "view", (p) => {
    bar.current!.style.transform = `scaleX(${map(p, [0.1, 0.45], [0, done.current])})`;
  });

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div className="flex justify-between font-mono text-xs text-muted-foreground">
        <span>2025</span>
        <span ref={label} className="text-foreground" />
        <span>2028</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-border">
        <div ref={bar} className="h-full origin-left scale-x-0 rounded-full bg-accent" />
      </div>
    </div>
  );
}
