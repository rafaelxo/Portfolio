import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  heading,
  subheading,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {label && (
        <span className="font-mono text-xs tracking-wider text-accent">
          {label}
        </span>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {heading}
      </h2>
      {subheading && (
        <p
          className={cn(
            "max-w-2xl text-base text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
