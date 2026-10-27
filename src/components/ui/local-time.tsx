"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Sao_Paulo",
});

/* Hora local de Belo Horizonte; só aparece depois de montar, para não divergir do HTML estático. */
export function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground" title="Belo Horizonte (UTC−3)">
      <span className="size-1.5 rounded-full bg-available" aria-hidden="true" />
      <span className="tabular-nums">{time || "--:--"}</span>
      <span className="hidden lg:inline">BH</span>
    </span>
  );
}
