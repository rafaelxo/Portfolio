import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/motion/count-up";

/* Números reais: os dois primeiros vêm do GitHub no build; o terceiro é o banco de exercícios do Pragma. */
export function Highlights({ contributions, stars }: { contributions: number; stars: number }) {
  const t = useTranslations("highlights");
  const items = [
    { value: contributions, label: t("contributions") },
    { value: stars, label: t("stars") },
    { value: 984, label: t("algoflow") },
  ];

  return (
    <section className="pb-4">
      <Container>
        <div className="grid overflow-hidden rounded-card border border-border bg-border sm:grid-cols-3 sm:gap-px">
          {items.map((item, i) => (
            <div
              key={item.label}
              data-reveal
              style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
              className="flex flex-col gap-1.5 border-b border-border bg-surface p-5 last:border-b-0 sm:border-b-0 sm:p-6"
            >
              <CountUp
                value={item.value}
                className="text-3xl font-semibold tabular-nums tracking-tight text-foreground sm:text-[2.1rem]"
              />
              <p className="text-[13px] leading-snug text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
