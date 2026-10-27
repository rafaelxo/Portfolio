import { Container } from "./container";
import { cn } from "@/lib/utils";
import { Scramble } from "@/components/motion/scramble";

export function Section({
  id,
  title,
  aside,
  children,
  className,
}: {
  id?: string;
  title: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-16 border-t border-border py-16 sm:py-20", className)}>
      <Container>
        <div className="mb-10 flex items-baseline justify-between gap-4">
          <h2 data-reveal className="flex items-baseline gap-2 text-[22px] font-semibold tracking-tight text-foreground">
            <span className="font-mono text-sm font-normal text-accent" aria-hidden="true">
              ~/
            </span>
            <Scramble text={title} />
          </h2>
          {aside && <div className="font-mono text-xs text-faint">{aside}</div>}
        </div>
        {children}
      </Container>
    </section>
  );
}
