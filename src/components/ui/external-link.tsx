import type { ComponentProps } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExternalLink({
  className,
  children,
  showIcon = true,
  ...props
}: ComponentProps<"a"> & { showIcon?: boolean }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-1 text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent",
        className,
      )}
      {...props}
    >
      {children}
      {showIcon && (
        <ArrowUpRight
          className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </a>
  );
}
