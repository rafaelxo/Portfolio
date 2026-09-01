import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="scroll-mt-16 border-t border-border py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading label={t("label")} heading={t("heading")} />
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("paragraph")}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-card border border-border bg-surface p-5">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              {t("currentlyLabel")}
            </p>
            <ul className="mt-3 flex flex-col gap-1.5 text-sm text-foreground/90">
              <li>{t("currentlyLine1")}</li>
              <li>{t("currentlyLine2")}</li>
              <li>{t("currentlyLine3")}</li>
            </ul>
          </div>

          <div className="rounded-card border border-border bg-surface p-5">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {t("languagesLabel")}
            </p>
            <ul className="mt-3 flex flex-col gap-1.5 text-sm text-foreground/90">
              <li>{t("languagePortuguese")}</li>
              <li>{t("languageEnglish")}</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
