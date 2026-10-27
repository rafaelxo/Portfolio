import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Tenure } from "@/components/motion/tenure";
import { Timeline } from "@/components/motion/timeline";

/* start: mês de início (1–12) para o tempo de casa, calculado no navegador */
const JOBS = [
  { slug: "dti", start: { year: 2026, month: 10 }, current: true },
  { slug: "agentCockpit", start: null, current: false },
] as const;

export function Experience() {
  const t = useTranslations("experience");

  return (
    <Section id="experience" title={t("heading")}>
      <Timeline>
        {JOBS.map((job, i) => {
          const item = t.raw(`items.${job.slug}`) as {
            company: string;
            role: string;
            period: string;
            location: string;
            intro?: string;
            highlights: string[];
          };
          return (
            <article
              key={job.slug}
              data-reveal
              style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
              className="relative grid gap-4 border-b border-border py-8 first:pt-0 last:border-b-0 md:grid-cols-[260px_1fr] md:gap-10"
            >
              <span
                aria-hidden="true"
                className={`absolute -left-6 top-[9px] size-[7px] rounded-full ring-4 ring-background md:-left-8 ${job.current ? "bg-accent shadow-[0_0_10px_var(--accent)]" : "bg-faint"} ${i === 0 ? "" : "mt-8"}`}
              />
              <div className="flex flex-col gap-1">
                <h3 className="flex items-center gap-2 font-semibold text-foreground">
                  {item.company}
                  {job.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-available/30 bg-available/10 px-2 py-0.5 font-mono text-[10px] font-normal text-available">
                      <span className="size-1.5 rounded-full bg-available" aria-hidden="true" />
                      {t("current")}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">{item.role}</p>
                <p className="mt-1 font-mono text-xs text-faint">
                  {item.period}
                  {job.start && (
                    <>
                      {" · "}
                      <Tenure year={job.start.year} month={job.start.month} one={t("month")} many={t("months")} />
                    </>
                  )}
                </p>
                <p className="font-mono text-xs text-faint">{item.location}</p>
              </div>
              <div className="flex flex-col gap-2.5 text-sm leading-relaxed text-muted-foreground">
                {item.intro && <p>{item.intro}</p>}
                {item.highlights.map((h) => (
                  <p key={h}>{h}</p>
                ))}
              </div>
            </article>
          );
        })}
      </Timeline>
    </Section>
  );
}
