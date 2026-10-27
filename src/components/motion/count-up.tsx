"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { ease, map, useScene } from "@/lib/scroll";

/* Número que sobe de 0 até o valor conforme entra na tela. */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const locale = useLocale();

  useScene(ref, "view", (p) => {
    ref.current!.textContent = Math.round(ease(map(p, [0.05, 0.35], [0, 1])) * value).toLocaleString(locale);
  });

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString(locale)}
    </span>
  );
}
