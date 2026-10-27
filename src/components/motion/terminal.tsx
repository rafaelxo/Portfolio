"use client";

import { useEffect, useState } from "react";

export type TerminalLine = { kind: "cmd" | "out"; text: string };

/* Digita os comandos letra por letra; as saídas aparecem inteiras. As linhas futuras já
   ocupam espaço (invisíveis) para o card não mudar de altura enquanto digita. */
export function Terminal({ lines, label }: { lines: TerminalLine[]; label: string }) {
  const [pos, setPos] = useState({ l: 0, c: 0 });

  useEffect(() => {
    if (pos.l >= lines.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const line = lines[pos.l];
    const typing = line.kind === "cmd" && pos.c < line.text.length;
    const delay = reduce ? 0 : pos.l === 0 && pos.c === 0 ? 900 : typing ? 38 : line.kind === "cmd" ? 280 : 110;
    const t = setTimeout(
      () => setPos(reduce ? { l: lines.length, c: 0 } : typing ? { l: pos.l, c: pos.c + 1 } : { l: pos.l + 1, c: 0 }),
      delay,
    );
    return () => clearTimeout(t);
  }, [pos, lines]);

  return (
    <div
      role="img"
      aria-label={label}
      className="w-full overflow-hidden rounded-card border border-border bg-surface/90 font-mono text-[12px] leading-relaxed shadow-2xl backdrop-blur"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] text-muted-foreground">~/rafaelxo — zsh</span>
      </div>
      <div className="flex flex-col gap-0.5 px-4 py-3" aria-hidden="true">
        {lines.map((line, i) => {
          const done = i < pos.l;
          const current = i === pos.l;
          const text = current && line.kind === "cmd" ? line.text.slice(0, pos.c) : line.text;
          return (
            <div
              key={i}
              className={line.kind === "cmd" ? "text-foreground" : "whitespace-pre text-muted-foreground"}
              style={{ visibility: done || (current && line.kind === "cmd") ? "visible" : "hidden" }}
            >
              {line.kind === "cmd" && <span className="text-accent">$ </span>}
              {text}
              {current && <span className="caret" />}
            </div>
          );
        })}
        <div style={{ visibility: pos.l >= lines.length ? "visible" : "hidden" }}>
          <span className="text-accent">$ </span>
          <span className="caret" />
        </div>
      </div>
    </div>
  );
}
