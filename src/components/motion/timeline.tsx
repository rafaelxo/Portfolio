"use client";

import { useRef } from "react";
import { map, useScene } from "@/lib/scroll";

/* Linha verde à esquerda que se desenha conforme a lista passa pela tela. */
export function Timeline({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useScene(ref, "view", (p) => {
    line.current!.style.transform = `scaleY(${map(p, [0.15, 0.6], [0, 1])})`;
  });

  return (
    <div ref={ref} className="relative pl-6 md:pl-8">
      <div className="absolute bottom-2 left-[3px] top-2 w-px bg-border">
        <div ref={line} className="h-full w-full origin-top scale-y-0 bg-accent shadow-[0_0_8px_var(--accent)]" />
      </div>
      {children}
    </div>
  );
}
