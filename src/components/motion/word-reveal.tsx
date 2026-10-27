"use client";

import { useRef } from "react";
import { clamp, map, useScene } from "@/lib/scroll";

/* O parágrafo acende palavra por palavra enquanto atravessa a tela. */
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const box = useRef<HTMLParagraphElement>(null);

  useScene(box, "view", (p) => {
    const ws = box.current!.children;
    const q = map(p, [0.15, 0.55], [0, ws.length]);
    for (let k = 0; k < ws.length; k++)
      (ws[k] as HTMLElement).style.opacity = String(0.22 + 0.78 * clamp(q - k));
  });

  return (
    <p ref={box} className={className}>
      {text.split(" ").map((w, k) => (
        <span key={k} style={{ opacity: 0.22 }} className="transition-opacity duration-200">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
