"use client";

import { useRef, useState } from "react";
import { useLocale } from "next-intl";
import { clamp, map, useScene } from "@/lib/scroll";
import type { ContributionDay } from "@/lib/github";
import { cn } from "@/lib/utils";

const LEVELS = ["bg-foreground/[0.06]", "bg-accent/30", "bg-accent/55", "bg-accent/80", "bg-accent"];
const MOBILE_WEEKS = 22;

/* Calendário de contribuições: as semanas acendem da esquerda para a direita ao rolar,
   e passar o mouse num dia mostra o detalhe na legenda. */
export function Heatmap({
  weeks,
  hint,
  less,
  more,
}: {
  weeks: ContributionDay[][];
  hint: string;
  less: string;
  more: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [day, setDay] = useState<ContributionDay | null>(null);
  const locale = useLocale();
  const fmt = new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  useScene(ref, "view", (p) => {
    const cols = Array.from(ref.current!.children) as HTMLElement[];
    const q = map(p, [0.08, 0.4], [0, cols.length + 4]);
    cols.forEach((col, i) => {
      const v = clamp((q - i) / 4);
      col.style.opacity = String(v);
      col.style.transform = `translateY(${(1 - v) * 8}px)`;
    });
  });

  return (
    <div className="flex flex-col gap-3">
      <div ref={ref} className="flex gap-[3px]" onMouseLeave={() => setDay(null)}>
        {weeks.map((week, i) => (
          <div
            key={i}
            className={cn("min-w-0 flex-1 flex-col gap-[3px]", i < weeks.length - MOBILE_WEEKS ? "hidden md:flex" : "flex")}
          >
            {week.map((d) => (
              <span
                key={d.date}
                onMouseEnter={() => setDay(d)}
                className={cn(
                  "aspect-square w-full rounded-[2px] transition-shadow",
                  LEVELS[d.level] ?? LEVELS[0],
                  day?.date === d.date && "ring-1 ring-foreground/60",
                )}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-faint">
        <span className={day ? "text-foreground" : undefined}>
          {day ? `${day.count} · ${fmt.format(new Date(day.date))}` : hint}
        </span>
        <span className="flex items-center gap-1.5">
          {less}
          {LEVELS.map((c) => (
            <span key={c} className={cn("size-2.5 rounded-[2px]", c)} />
          ))}
          {more}
        </span>
      </div>
    </div>
  );
}
