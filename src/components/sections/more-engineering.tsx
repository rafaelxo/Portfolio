import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExternalLink } from "@/components/ui/external-link";
import { TechBadge } from "@/components/ui/tech-badge";
import { labs } from "@/data/labs";

export function MoreEngineering() {
  const t = useTranslations("labs");

  return (
    <section className="border-t border-border py-20 sm:py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          label={t("label")}
          heading={t("heading")}
          subheading={t("subheading")}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {labs.map((lab) => {
            const content = t.raw(`items.${lab.slug}`) as {
              name: string;
              subtitle?: string;
              description: string;
            };
            return (
              <div
                key={lab.slug}
                className="flex flex-col gap-3 rounded-card border border-border bg-surface p-6"
              >
                <div className="flex flex-col gap-1">
                  <ExternalLink
                    href={lab.href}
                    className="w-fit text-sm font-semibold no-underline hover:text-accent hover:underline"
                  >
                    {content.name}
                  </ExternalLink>
                  {content.subtitle && (
                    <span className="text-xs text-muted-foreground">
                      {content.subtitle}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {content.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                  {lab.tags.map((tag) => (
                    <TechBadge key={tag}>{tag}</TechBadge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
