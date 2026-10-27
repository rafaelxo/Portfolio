import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { stack, type StackCategory } from "@/data/stack";

const ORDER: StackCategory[] = ["languages", "backend", "frontend", "data", "cloud", "ai"];

export function Skills() {
  const t = useTranslations("skills");

  return (
    <Section id="skills" title={t("heading")}>
      <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {ORDER.map((cat, i) => (
          <div
            key={cat}
            data-reveal
            style={{ "--d": `${(i % 3) * 70}ms` } as React.CSSProperties}
            className="border-b border-border py-5"
          >
            <p className="font-mono text-xs lowercase text-faint">{t(`categories.${cat}`)}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {stack
                .filter((s) => s.category === cat)
                .map((s) => s.name)
                .join(", ")}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
