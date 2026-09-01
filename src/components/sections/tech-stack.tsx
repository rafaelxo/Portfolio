import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { stack, type StackCategory } from "@/data/stack";

const CATEGORY_ORDER: StackCategory[] = [
  "languages",
  "frontend",
  "backend",
  "data",
  "cloud",
  "ai",
];

export function TechStack() {
  const t = useTranslations("stack");

  return (
    <section id="stack" className="scroll-mt-16 border-t border-border py-20 sm:py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          label={t("label")}
          heading={t("heading")}
          subheading={t("subheading")}
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_ORDER.map((category) => {
            const items = stack.filter((item) => item.category === category);
            return (
              <div key={category} className="flex flex-col gap-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {t(`categories.${category}`)}
                </h3>
                <ul className="flex flex-col gap-2 border-l border-border pl-4">
                  {items.map((item) => (
                    <li key={item.name} className="text-sm font-medium text-foreground">
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
