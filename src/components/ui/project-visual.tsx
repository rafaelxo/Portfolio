import type { ProjectImage } from "@/data/projects";
import Image from "next/image";
import { cn } from "@/lib/utils";

const wrapperClass =
  "relative aspect-16/10 w-full self-start overflow-hidden rounded-card border border-border bg-surface";

const gridBg =
  "absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40";

function AlgoflowVisual() {
  const bars = [92, 78, 60, 45, 32, 20];
  return (
    <div className={cn(wrapperClass, "flex items-end gap-2 p-8")}>
      <div className={gridBg} />
      {bars.map((h, i) => (
        <div
          key={i}
          className={cn("relative z-10 flex-1 rounded-t-sm", i === 2 ? "bg-accent" : "bg-border")}
          style={{ height: `${h}%` }}
        />
      ))}
      <span className="absolute right-4 top-4 z-10 font-mono text-[10px] text-muted-foreground">step 14 / 31</span>
    </div>
  );
}

function PostableVisual() {
  const cards = [40, 65, 50, 75, 35, 55];
  return (
    <div className={cn(wrapperClass, "grid grid-cols-3 gap-2 p-6")}>
      <div className={gridBg} />
      {cards.map((h, i) => (
        <div
          key={i}
          className={cn(
            "relative z-10 rounded-md border",
            i === 1 ? "border-accent bg-accent/10" : "border-border bg-background",
          )}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

/* Árvore B+ da camada de persistência feita do zero */
function HostlyVisual() {
  const leaves = [20, 60, 140, 180];
  return (
    <div className={cn(wrapperClass, "flex items-center justify-center")}>
      <div className={gridBg} />
      <svg viewBox="0 0 200 140" className="relative z-10 h-2/3 w-2/3">
        <g stroke="var(--border)" strokeWidth="1.5" fill="none">
          <line x1="100" y1="20" x2="40" y2="70" />
          <line x1="100" y1="20" x2="160" y2="70" />
          {leaves.map((x) => (
            <line key={x} x1={x < 100 ? 40 : 160} y1="70" x2={x} y2="120" />
          ))}
        </g>
        <rect x="80" y="12" width="40" height="16" rx="3" fill="var(--accent)" />
        <rect x="22" y="62" width="36" height="16" rx="3" fill="var(--border)" />
        <rect x="142" y="62" width="36" height="16" rx="3" fill="var(--accent)" opacity="0.6" />
        {leaves.map((x) => (
          <rect key={x} x={x - 12} y="114" width="24" height="12" rx="2" fill="var(--border)" />
        ))}
      </svg>
      <span className="absolute right-4 top-4 z-10 font-mono text-[10px] text-muted-foreground">B+ tree · .hbak</span>
    </div>
  );
}

/* Semana de atividades empilhadas por categoria */
function TimeAwardsVisual() {
  const week = [
    [3, 2, 1],
    [4, 1, 2],
    [2, 3, 1],
    [5, 1, 1],
    [3, 2, 2],
    [1, 4, 3],
    [2, 1, 4],
  ];
  const tones = ["bg-accent", "bg-accent/50", "bg-border"];
  return (
    <div className={cn(wrapperClass, "flex items-end gap-3 p-8 pt-12")}>
      <div className={gridBg} />
      {week.map((day, i) => (
        <div key={i} className="relative z-10 flex h-full flex-1 flex-col-reverse gap-1">
          {day.map((h, k) => (
            <div key={k} className={cn("rounded-sm", tones[k])} style={{ height: `${h * 9}%` }} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* Moldura de leitura da câmera sobre um comprovante */
function CardsVisual() {
  return (
    <div className={cn(wrapperClass, "flex items-center justify-center")}>
      <div className={gridBg} />
      <div className="relative z-10 flex w-1/2 flex-col gap-2 rounded-md border border-border bg-background p-4 font-mono text-[10px] text-muted-foreground">
        <span className="text-foreground">VISA · CRÉDITO</span>
        <span>27/10/2026</span>
        <span className="text-accent">R$ 128,90</span>
        <span className="absolute -inset-2 rounded-lg border-2 border-dashed border-accent/60" />
      </div>
      <span className="absolute right-4 top-4 z-10 font-mono text-[10px] text-muted-foreground">ocr · 0.1s</span>
    </div>
  );
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function ProjectVisual({ image }: { image: ProjectImage }) {
  if (image.kind === "screenshot") {
    return (
      <div className={wrapperClass}>
        <Image
          src={`${basePath}${image.src}`}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover object-top"
        />
      </div>
    );
  }

  if (image.kind === "phones") {
    return (
      <div role="img" aria-label={image.alt} className={cn(wrapperClass, "flex items-end justify-center gap-3 px-6 pt-6")}>
        <div className={gridBg} />
        {image.srcs.map((src, i) => (
          <Image
            key={src}
            src={`${basePath}${src}`}
            alt=""
            width={414}
            height={900}
            sizes="200px"
            className={cn(
              "relative z-10 w-[28%] rounded-t-xl border border-b-0 border-border object-cover object-top shadow-xl",
              i === 1 ? "h-[94%]" : "h-[82%]",
            )}
          />
        ))}
      </div>
    );
  }

  switch (image.variant) {
    case "algoflow":
      return <AlgoflowVisual />;
    case "postable":
      return <PostableVisual />;
    case "hostly":
      return <HostlyVisual />;
    case "timeawards":
      return <TimeAwardsVisual />;
    case "cards":
      return <CardsVisual />;
    default:
      return <div className={wrapperClass} />;
  }
}
