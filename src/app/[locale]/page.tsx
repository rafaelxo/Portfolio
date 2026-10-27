import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { Experience } from "@/components/sections/experience";
import { GitHubActivity } from "@/components/sections/github-activity";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import type { TerminalLine } from "@/components/motion/terminal";
import { getGitHub } from "@/lib/github";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const gh = await getGitHub("rafaelxo");
  const top = gh.topRepos.slice(0, 2);
  const pad = Math.max(0, ...top.map((r) => r.name.length));
  const terminal: TerminalLine[] = [
    { kind: "cmd", text: "whoami" },
    { kind: "out", text: "rafael xavier · swe intern @ dti digital" },
    { kind: "cmd", text: "gh search repos --owner rafaelxo --sort stars -L 2" },
    ...top.map((r) => ({
      kind: "out" as const,
      text: `${r.name.padEnd(pad)}  ★ ${String(r.stars).padStart(3)}  ${r.language ?? ""}`,
    })),
  ];

  return (
    <>
      <Hero terminal={terminal} />
      <Highlights contributions={gh.contributions.total} stars={gh.stars} />
      <About />
      <Experience />
      <Projects />
      <GitHubActivity />
      <Skills />
      <Contact />
    </>
  );
}
