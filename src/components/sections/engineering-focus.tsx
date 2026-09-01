import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function EngineeringFocus() {
  const t = useTranslations("focus");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section className="border-t border-border py-20 sm:py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading label={t("label")} heading={t("heading")} />
        <div className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div key={item.title} className="flex flex-col gap-3 bg-surface p-6">
              <span className="font-mono text-xs text-muted-foreground">
                0{i + 1}
              </span>
              <h3 className="text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
