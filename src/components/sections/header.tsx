"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { LocalTime } from "@/components/ui/local-time";
import { cn } from "@/lib/utils";
import { useScene } from "@/lib/scroll";

const SECTIONS = ["about", "experience", "projects", "github", "skills", "contact"] as const;

export function Header() {
  const t = useTranslations("nav");
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useScene(bar, "page", (p) => {
    bar.current!.style.transform = `scaleX(${p})`;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div ref={bar} className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent" />
      <Container className="flex h-14 items-center justify-between gap-4">
        <a href="#top" className="text-sm font-semibold tracking-tight text-foreground">
          Rafael Xavier
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "text-[13px] text-muted-foreground transition-colors hover:text-foreground",
                active === id && "text-foreground",
              )}
            >
              {t(id)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocalTime />
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? t("menuClose") : t("menuOpen")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {SECTIONS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground",
                  active === id && "text-foreground",
                )}
              >
                {t(id)}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
              <LocalTime />
              <LanguageToggle />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
