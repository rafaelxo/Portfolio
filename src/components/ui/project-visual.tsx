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
          className={cn(
            "relative z-10 flex-1 rounded-t-sm",
            i === 2 ? "bg-accent" : "bg-border",
          )}
          style={{ height: `${h}%` }}
        />
      ))}
      <span className="absolute right-4 top-4 z-10 font-mono text-[10px] text-muted-foreground">
        step 14 / 31
      </span>
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
            i === 1
              ? "border-accent bg-accent/10"
              : "border-border bg-background",
          )}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function HostlyVisual() {
  return (
    <div className={cn(wrapperClass, "flex items-center justify-center")}>
      <div className={gridBg} />
      <svg viewBox="0 0 200 140" className="relative z-10 h-2/3 w-2/3">
        <g stroke="var(--border)" strokeWidth="1.5" fill="none">
          <line x1="100" y1="20" x2="40" y2="70" />
          <line x1="100" y1="20" x2="100" y2="70" />
          <line x1="100" y1="20" x2="160" y2="70" />
          <line x1="40" y1="70" x2="20" y2="120" />
          <line x1="40" y1="70" x2="60" y2="120" />
          <line x1="160" y1="70" x2="140" y2="120" />
          <line x1="160" y1="70" x2="180" y2="120" />
        </g>
        <circle cx="100" cy="20" r="7" fill="var(--accent)" />
        <circle cx="40" cy="70" r="6" fill="var(--border)" />
        <circle cx="100" cy="70" r="6" fill="var(--accent)" />
        <circle cx="160" cy="70" r="6" fill="var(--border)" />
        {[
          [20, 120],
          [60, 120],
          [140, 120],
          [180, 120],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="var(--border)" />
        ))}
      </svg>
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
          priority
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover object-top"
        />
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
    default:
      return <div className={wrapperClass} />;
  }
}
