import { useTranslations } from "next-intl";
import { GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function Education() {
  const t = useTranslations("education");

  return (
    <section className="border-t border-border py-16 sm:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading label={t("label")} heading={t("heading")} />
        <div className="flex max-w-xl items-start gap-4 rounded-card border border-border bg-surface p-5">
          <GraduationCap
            className="mt-0.5 size-5 shrink-0 text-accent"
            aria-hidden="true"
          />
          <div>
            <p className="text-sm font-semibold text-foreground">
              {t("degree")}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("institution")} · {t("location")}
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {t("period")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
