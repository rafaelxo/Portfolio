import { getTranslations } from "next-intl/server";
import { ChevronRight, Star } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ExternalLink } from "@/components/ui/external-link";
import { TechBadge } from "@/components/ui/tech-badge";
import { ProjectVisual } from "@/components/ui/project-visual";
import { CopyCommand } from "@/components/ui/copy-command";
import { projects, type Project } from "@/data/projects";
import { getRepoStars } from "@/lib/github";
import { cn } from "@/lib/utils";

const STATUS_DOT: Record<Project["status"], string> = {
  live: "bg-available",
  npm: "bg-amber-400",
  repo: "bg-faint",
  private: "bg-sky-400",
};

const COLS = "grid-cols-[72px_1fr_auto] md:grid-cols-[88px_1fr_1.3fr_150px]";

export async function Projects() {
  const t = await getTranslations("projects");
  const rows = await Promise.all(
    projects.map(async (p) => ({
      p,
      stars: p.owner && p.repo ? await getRepoStars(p.owner, p.repo, p.fallbackStars ?? 0) : null,
      c: t.raw(`items.${p.slug}`) as {
        name: string;
        category: string;
        description: string;
        period: string;
        role?: string;
        contribution?: string;
        challenges?: string[];
      },
    })),
  );

  return (
    <Section id="projects" title={t("heading")} aside={t("count", { n: projects.length })}>
      <p data-reveal className="mb-4 font-mono text-xs text-faint">
        {t("hint")}
      </p>
      <div className="overflow-hidden rounded-card border border-border bg-surface/70">
        <div className={cn("grid gap-4 border-b border-border px-4 py-2.5 font-mono text-[11px] text-faint", COLS)}>
          <span>{t("columns.status")}</span>
          <span>{t("columns.project")}</span>
          <span className="hidden md:block">{t("columns.stack")}</span>
          <span className="text-right">{t("columns.period")}</span>
        </div>

        {rows.map(({ p, stars, c }, i) => (
          <details
            key={p.slug}
            data-reveal
            style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
            className="project border-b border-border last:border-b-0"
          >
            <summary
              className={cn(
                "grid items-center gap-4 px-4 py-3.5 transition-colors hover:bg-surface-hover",
                COLS,
              )}
            >
              <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <span className={cn("size-1.5 rounded-full", STATUS_DOT[p.status])} aria-hidden="true" />
                {t(`status.${p.status}`)}
              </span>
              <span className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-foreground">
                <span className="truncate">{c.name}</span>
                <ChevronRight className="chev size-3.5 shrink-0 text-faint" aria-hidden="true" />
              </span>
              <span className="hidden truncate font-mono text-xs text-muted-foreground md:block">
                {p.technologies.slice(0, 3).join(" · ")}
              </span>
              <span className="text-right font-mono text-xs text-muted-foreground">{c.period}</span>
            </summary>

            <div className="grid gap-8 border-t border-border bg-background/40 px-4 py-6 sm:px-6 lg:grid-cols-2">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-xs text-accent">{c.category}</p>
                  {stars !== null && (
                    <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                      {p.owner && p.owner !== "rafaelxo" && <span className="text-faint">{p.owner}/</span>}
                      <span className="flex items-center gap-1" aria-label={`${stars} ${t("stars")}`}>
                        <Star className="size-3.5" aria-hidden="true" />
                        {stars}
                      </span>
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                {c.role && c.contribution && (
                  <div>
                    <p className="font-mono text-[11px] text-faint">
                      {t("roleLabel")} · <span className="text-foreground">{c.role}</span>
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">{c.contribution}</p>
                  </div>
                )}
                {c.challenges && (
                  <div>
                    <p className="font-mono text-[11px] text-faint">{t("challengesLabel")}</p>
                    <ul className="mt-2.5 flex flex-col gap-2">
                      {c.challenges.map((ch) => (
                        <li key={ch} className="flex gap-2 text-sm text-foreground/90">
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                          {ch}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                {p.image && <ProjectVisual image={p.image} />}
                <div className="flex flex-wrap gap-1.5">
                  {p.technologies.map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-5 text-sm">
                  {p.links.map((link) => (
                    <ExternalLink key={link.href} href={link.href}>
                      {link.label === "code" ? t("code") : t("live")}
                    </ExternalLink>
                  ))}
                  {p.installCommand && <CopyCommand command={p.installCommand} copiedLabel={t("copyInstall")} />}
                  {p.status === "private" && <p className="font-mono text-xs text-faint">{t("privateNote")}</p>}
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
