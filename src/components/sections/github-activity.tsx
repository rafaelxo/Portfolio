import { getLocale, getTranslations } from "next-intl/server";
import { GitFork, Star } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Heatmap } from "@/components/motion/heatmap";
import { RelativeTime } from "@/components/motion/relative-time";
import { getGitHub, LANGUAGE_COLORS } from "@/lib/github";
import Image from "next/image";
import { orgs, social } from "@/data/social";

const HOT = new Set(["PushEvent", "PullRequestEvent", "ReleaseEvent"]);

export async function GitHubActivity() {
  const t = await getTranslations("github");
  const locale = await getLocale();
  const gh = await getGitHub("rafaelxo");
  const label = (type: string) => (t.has(`events.${type}`) ? t(`events.${type}`) : type.replace("Event", "").toLowerCase());

  return (
    <Section
      id="github"
      title={t("heading")}
      aside={
        <a href={social.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
          @rafaelxo ↗
        </a>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1.65fr_1fr]">
        <div data-reveal className="flex flex-col gap-5 rounded-card border border-border bg-surface/70 p-5 sm:p-6">
          <p className="font-mono text-sm text-foreground">
            <span className="text-accent">{gh.contributions.total.toLocaleString(locale)}</span>{" "}
            {t("contributions")}
          </p>
          {gh.contributions.weeks.length > 0 && (
            <Heatmap weeks={gh.contributions.weeks} hint={t("hover")} less={t("less")} more={t("more")} />
          )}
          {gh.languages.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-border pt-5">
              <div className="flex h-1.5 overflow-hidden rounded-full">
                {gh.languages.map((l) => (
                  <span
                    key={l.name}
                    style={{ width: `${l.share * 100}%`, background: LANGUAGE_COLORS[l.name] ?? LANGUAGE_COLORS.Other }}
                  />
                ))}
              </div>
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[11px] text-muted-foreground">
                {gh.languages.map((l) => (
                  <li key={l.name} className="flex items-center gap-1.5">
                    <span
                      className="size-2 rounded-full"
                      style={{ background: LANGUAGE_COLORS[l.name] ?? LANGUAGE_COLORS.Other }}
                    />
                    {l.name}
                    <span className="text-faint">{(l.share * 100).toFixed(1)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div data-reveal style={{ "--d": "90ms" } as React.CSSProperties} className="rounded-card border border-border bg-surface/70 p-5 sm:p-6">
          <p className="mb-4 font-mono text-[11px] text-faint">{t("activity")}</p>
          {gh.activity.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("noActivity")}</p>
          ) : (
            <ul className="flex flex-col gap-3.5">
              {gh.activity.map((e) => (
                <li key={`${e.type}-${e.repo}-${e.at}`} className="font-mono text-xs">
                  <p className="text-faint">
                    <span className={HOT.has(e.type) ? "text-accent" : "text-muted-foreground"}>
                      {label(e.type)}
                      {e.action ? ` ${e.action}` : ""}
                    </span>
                    {" · "}
                    <RelativeTime iso={e.at} />
                  </p>
                  <a
                    href={`https://github.com/${e.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {e.repo}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <p data-reveal className="font-mono text-[11px] text-faint">
          {t("orgs")}
        </p>
        <div data-reveal className="flex flex-wrap gap-3">
          {orgs.map((o) => (
            <a
              key={o.login}
              href={`https://github.com/${o.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-card border border-border bg-surface/70 py-2 pl-2 pr-4 transition-colors hover:border-accent/50 hover:bg-surface-hover"
            >
              <Image src={o.avatar} alt="" width={28} height={28} className="size-7 rounded-md" />
              <span className="flex flex-col leading-tight">
                <span className="text-sm text-foreground transition-colors group-hover:text-accent">{o.name}</span>
                <span className="font-mono text-[11px] text-faint">@{o.login}</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {gh.pinned.length > 0 && (
        <div className="mt-10 flex flex-col gap-4">
          <p data-reveal className="font-mono text-[11px] text-faint">
            {t("pinned")}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {gh.pinned.map((r, i) => {
              const [owner, name] = r.nameWithOwner.split("/");
              return (
                <a
                  key={r.nameWithOwner}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-reveal
                  style={{ "--d": `${(i % 3) * 70}ms` } as React.CSSProperties}
                  className="group flex flex-col gap-2 rounded-card border border-border bg-surface/70 p-4 transition-colors hover:border-accent/50 hover:bg-surface-hover"
                >
                  <span className="truncate font-mono text-sm">
                    <span className="text-faint">{owner}/</span>
                    <span className="text-foreground transition-colors group-hover:text-accent">{name}</span>
                  </span>
                  {r.description && <p className="line-clamp-2 text-xs text-muted-foreground">{r.description}</p>}
                  <div className="mt-auto flex items-center gap-4 pt-1 font-mono text-[11px] text-muted-foreground">
                    {r.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="size-2 rounded-full"
                          style={{ background: LANGUAGE_COLORS[r.language] ?? LANGUAGE_COLORS.Other }}
                        />
                        {r.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="size-3" aria-hidden="true" />
                      {r.stars}
                    </span>
                    {r.forks > 0 && (
                      <span className="flex items-center gap-1">
                        <GitFork className="size-3" aria-hidden="true" />
                        {r.forks}
                      </span>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </Section>
  );
}
