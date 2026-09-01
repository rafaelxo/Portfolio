"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageToggle() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const otherLocale =
    routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  function handleClick() {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`${pathname}${hash}`, { locale: otherLocale });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t("language")}
      className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 font-mono text-xs transition-colors hover:bg-surface-hover"
    >
      <span className={locale === "en" ? "text-accent" : "text-muted-foreground"}>
        EN
      </span>
      <span aria-hidden="true" className="text-border">
        |
      </span>
      <span className={locale === "pt" ? "text-accent" : "text-muted-foreground"}>
        PT
      </span>
    </button>
  );
}
