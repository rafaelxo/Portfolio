import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Terminal, type TerminalLine } from "@/components/motion/terminal";
import { social } from "@/data/social";
import { Parallax } from "@/components/motion/parallax";

export function Hero({ terminal }: { terminal: TerminalLine[] }) {
  const t = useTranslations("hero");

  return (
    <section id="top" className="pb-16 pt-12 sm:pt-16 lg:pb-20 lg:pt-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <Parallax y={-50} fade className="flex flex-col gap-6">
          <span className="rise inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-available opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-available" />
            </span>
            {t("status")}
          </span>

          <h1
            className="rise max-w-[17ch] text-balance text-[clamp(2.3rem,5.2vw,3.7rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-foreground"
            style={{ animationDelay: "90ms" }}
          >
            {t("headline")}
          </h1>

          <p
            className="rise max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base"
            style={{ animationDelay: "180ms" }}
          >
            {t("body")}
          </p>

          <div className="rise flex flex-wrap gap-3" style={{ animationDelay: "260ms" }}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              {t("ctaPrimary")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${social.email}`}
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
            >
              <Mail className="size-4" aria-hidden="true" />
              {t("ctaEmail")}
            </a>
          </div>

          <div className="rise mt-2 max-w-xl" style={{ animationDelay: "380ms" }}>
            <Terminal lines={terminal} label={t("terminalLabel")} />
          </div>
        </Parallax>

        <Parallax y={90} className="mx-auto w-full max-w-[260px] lg:ml-auto lg:mr-0 lg:max-w-[300px]">
        <div className="rise" style={{ animationDelay: "240ms" }}>
          <figure className="relative overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              src={`${social.avatar}&s=800`}
              alt={t("photoAlt")}
              width={800}
              height={800}
              priority
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-10 font-mono text-[11px] text-white/80">
              <span>rafael xavier oliveira</span>
              <span>bh · br</span>
            </figcaption>
          </figure>
        </div>
        </Parallax>
      </Container>
    </section>
  );
}
