import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { LinkButton } from "@/components/ui/button";
import { NodeField } from "@/components/ui/node-field";
import { social } from "@/data/social";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden">
      <NodeField />
      <Container className="relative flex min-h-[88vh] flex-col justify-center gap-6 py-20">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          {t("eyebrow")}
        </span>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Rafael Xavier Oliveira
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">{t("body")}</p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span>{t("meta")}</span>
          <span aria-hidden="true">·</span>
          <span>{t("location")}</span>
        </div>

        <p className="font-mono text-sm text-foreground/80">{t("stackLine")}</p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <LinkButton href="#projects" variant="primary">
            {t("ctaPrimary")}
          </LinkButton>
          <LinkButton
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            <GithubIcon className="size-4" />
            {t("ctaGithub")}
          </LinkButton>
          <LinkButton
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
          >
            <LinkedinIcon className="size-4" />
            {t("ctaLinkedin")}
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
