"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Check, Copy } from "lucide-react";
import { Container } from "@/components/ui/container";
import { social } from "@/data/social";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";

export function Contact() {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — link below still works
    }
  }

  return (
    <section id="contact" className="scroll-mt-16 border-t border-border py-20 sm:py-28">
      <Container className="flex flex-col items-start gap-8">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs tracking-wider text-accent">
            {t("label")}
          </span>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="max-w-xl text-base text-muted-foreground">
            {t("subheading")}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={`mailto:${social.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            <Mail className="size-4" aria-hidden="true" />
            {social.email}
          </a>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={t("copyEmail")}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
          >
            {copied ? (
              <Check className="size-4 text-accent" aria-hidden="true" />
            ) : (
              <Copy className="size-4" aria-hidden="true" />
            )}
            {copied ? t("copied") : t("copyEmail")}
          </button>
        </div>

        <div className="flex items-center gap-5 pt-2 text-sm">
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
          >
            <LinkedinIcon className="size-4" />
            {t("linkedinLabel")}
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
          >
            <GithubIcon className="size-4" />
            {t("githubLabel")}
          </a>
        </div>
      </Container>
    </section>
  );
}
