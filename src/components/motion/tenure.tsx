"use client";

import { useEffect, useRef } from "react";

/* Tempo de casa contado no navegador (mês de início conta como o primeiro). */
export function Tenure({ year, month, one, many }: { year: number; month: number; one: string; many: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const now = new Date();
    const n = Math.max(1, (now.getFullYear() - year) * 12 + now.getMonth() - (month - 1) + 1);
    ref.current!.textContent = `${n} ${n === 1 ? one : many}`;
  }, [year, month, one, many]);

  return <span ref={ref} />;
}
