"use client";

import Lenis from "lenis";
import { useEffect, type RefObject } from "react";

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/* Interpolação por trechos: map(p, [0, .4, 1], [0, 100, 50]) vai de 0 a 100 até .4 e volta a 50 no fim. */
export const map = (p: number, ins: number[], outs: number[]) => {
  if (p <= ins[0]) return outs[0];
  for (let i = 1; i < ins.length; i++) {
    if (p <= ins[i]) return outs[i - 1] + ((outs[i] - outs[i - 1]) * (p - ins[i - 1])) / (ins[i] - ins[i - 1]);
  }
  return outs[outs.length - 1];
};

/* pin: 0 quando o topo da seção chega ao topo da tela, 1 quando o palco (1º filho, sticky) se solta.
   view: 0 quando a seção aparece embaixo, 1 quando some em cima. page: progresso da página inteira. */
type Mode = "pin" | "view" | "page";
type Scene = { ref: RefObject<HTMLElement | null>; mode: Mode; fn: (p: number) => void };
const scenes = new Set<Scene>();

export let lenis: Lenis | null = null;

const progress = (el: HTMLElement, mode: Mode) => {
  if (mode === "page") {
    const h = document.documentElement;
    return clamp(h.scrollTop / (h.scrollHeight - h.clientHeight || 1));
  }
  const r = el.getBoundingClientRect();
  if (mode === "view") return clamp((innerHeight - r.top) / (innerHeight + r.height));
  const stage = (el.firstElementChild as HTMLElement).offsetHeight;
  return clamp(-r.top / (r.height - stage || 1));
};

/* Um laço só por quadro: lê todas as posições primeiro, depois escreve os estilos. */
export function tick() {
  const list = [...scenes].filter((s) => s.ref.current);
  const ps = list.map((s) => progress(s.ref.current!, s.mode));
  list.forEach((s, i) => s.fn(ps[i]));
}

/* Sem deps de propósito: a cada render a cena pega o closure mais novo. */
export function useScene(ref: RefObject<HTMLElement | null>, mode: Mode, fn: (p: number) => void) {
  useEffect(() => {
    const s = { ref, mode, fn };
    scenes.add(s);
    tick();
    return () => void scenes.delete(s);
  });
}

export function startSmoothScroll() {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raf = 0;
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.09, anchors: { offset: -64 } });
    lenis.on("scroll", tick);
    const loop = (t: number) => {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  } else {
    addEventListener("scroll", tick, { passive: true });
  }
  addEventListener("resize", tick);
  return () => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
    removeEventListener("scroll", tick);
    removeEventListener("resize", tick);
  };
}
