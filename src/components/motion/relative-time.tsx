"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

const STEPS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31536e6],
  ["month", 2592e6],
  ["week", 6048e5],
  ["day", 864e5],
  ["hour", 36e5],
  ["minute", 6e4],
];

/* "há 3 dias" calculado no navegador; o HTML estático traz a data como fallback. */
export function RelativeTime({ iso }: { iso: string }) {
  const ref = useRef<HTMLTimeElement>(null);
  const locale = useLocale();

  useEffect(() => {
    const rtf = new Intl.RelativeTimeFormat(locale === "pt" ? "pt-BR" : "en-US", { numeric: "auto" });
    const diff = new Date(iso).getTime() - Date.now();
    const [unit, ms] = STEPS.find(([, ms]) => Math.abs(diff) >= ms) ?? ["minute", 6e4];
    ref.current!.textContent = rtf.format(Math.round(diff / ms), unit);
  }, [iso, locale]);

  return (
    <time ref={ref} dateTime={iso}>
      {iso.slice(0, 10)}
    </time>
  );
}
