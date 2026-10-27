"use client";

import { useRef } from "react";
import { map, useScene } from "@/lib/scroll";

/* Desloca o conteúdo conforme a rolagem: y em px ao longo da passagem pela tela,
   fade opcional quando sai por cima. */
export function Parallax({
  children,
  y = 60,
  fade = false,
  className,
}: {
  children: React.ReactNode;
  y?: number;
  fade?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useScene(ref, "view", (p) => {
    const el = ref.current!;
    el.style.transform = `translate3d(0,${map(p, [0.5, 1], [0, y])}px,0)`;
    if (fade) el.style.opacity = String(map(p, [0.55, 0.9], [1, 0.15]));
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
