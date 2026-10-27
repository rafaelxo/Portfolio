import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { WordReveal } from "@/components/motion/word-reveal";
import { CourseProgress } from "@/components/motion/course-progress";

export function About() {
  const t = useTranslations("about");
  const rows = t.raw("rows") as [string, string][];
  const build = t.raw("build") as { title: string; description: string }[];

  return (
    <Section id="about" title={t("heading")}>
      <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
        <div className="flex flex-col gap-12">
          <WordReveal text={t("paragraph")} className="text-[17px] leading-relaxed text-foreground sm:text-lg" />

          <div className="flex flex-col gap-5">
            <h3 data-reveal className="font-mono text-xs text-faint">
              {t("buildHeading")}
            </h3>
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {build.map((b, i) => (
                <div key={b.title} data-reveal style={{ "--d": `${(i % 2) * 80}ms` } as React.CSSProperties}>
                  <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                    {b.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <dl data-reveal className="flex flex-col">
            {rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[92px_1fr] gap-4 border-b border-border py-3 first:pt-0">
                <dt className="font-mono text-xs leading-6 text-faint">{k}</dt>
                <dd className="text-sm leading-6 text-foreground">{v}</dd>
              </div>
            ))}
          </dl>

          <div data-reveal className="flex flex-col gap-4">
            <h3 className="font-mono text-xs text-faint">{t("educationHeading")}</h3>
            <div className="grid grid-cols-[92px_1fr] gap-4">
              <span className="font-mono text-xs leading-6 text-faint">{t("period")}</span>
              <div className="flex flex-col gap-3">
                <p className="text-sm leading-6 text-foreground">{t("degree")}</p>
                <CourseProgress template={t.raw("progress") as string} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
