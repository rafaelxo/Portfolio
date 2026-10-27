"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy, Mail } from "lucide-react";
import { Section } from "@/components/ui/section";
import { social } from "@/data/social";

export function Contact() {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponível — o link de e-mail ao lado continua funcionando
    }
  }

  const links = [
    { href: social.github, label: "github.com/rafaelxo" },
    { href: social.linkedin, label: "linkedin.com/in/rafaelxo" },
  ];

  return (
    <Section id="contact" title={t("heading")}>
      <div className="grid gap-10 md:grid-cols-2">
        <p data-reveal className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
          {t("body")}
        </p>
        <div data-reveal style={{ "--d": "90ms" } as React.CSSProperties} className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${social.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <Mail className="size-4" aria-hidden="true" />
              {social.email}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={t("copyEmail")}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-surface-hover"
            >
              {copied ? <Check className="size-4 text-accent" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
              {copied ? t("copied") : t("copyEmail")}
            </button>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
