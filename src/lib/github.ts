import { cache } from "react";

/* Tudo aqui roda no build (site estático). Com GITHUB_TOKEN no ambiente o limite da API
   sobe; sem ele, cada função cai num valor seguro em vez de quebrar o build. */
const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function api<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, { headers });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

export async function getRepoStars(owner: string, repo: string, fallback: number): Promise<number> {
  const data = await api<{ stargazers_count?: number }>(`/repos/${owner}/${repo}`);
  return typeof data?.stargazers_count === "number" ? data.stargazers_count : fallback;
}

export interface Repo {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
}

export interface ContributionDay {
  date: string;
  level: number;
  count: number;
}

export interface PinnedRepo {
  nameWithOwner: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
}

export interface ActivityEvent {
  type: string;
  repo: string;
  at: string;
  action: string | null;
}

export interface GitHubData {
  repos: number;
  followers: number;
  stars: number;
  topRepos: Repo[];
  pinned: PinnedRepo[];
  activity: ActivityEvent[];
  languages: { name: string; share: number }[];
  contributions: { total: number; weeks: ContributionDay[][] };
}

type RestRepo = {
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
};

/* Fixados do perfil: GraphQL quando há token; sem token, lê os nomes do HTML público do
   perfil e completa cada um pela API REST (que não exige autenticação). */
async function getPinned(user: string): Promise<PinnedRepo[]> {
  if (process.env.GITHUB_TOKEN) {
    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{ user(login: "${user}") { pinnedItems(first: 6, types: [REPOSITORY]) { nodes { ... on Repository {
            nameWithOwner url description stargazerCount forkCount primaryLanguage { name } } } } } }`,
        }),
      });
      const json = (await res.json()) as {
        data?: { user: { pinnedItems: { nodes: { nameWithOwner: string; url: string; description: string | null; stargazerCount: number; forkCount: number; primaryLanguage: { name: string } | null }[] } } };
      };
      const nodes = json.data?.user.pinnedItems.nodes;
      if (nodes?.length)
        return nodes.map((n) => ({
          nameWithOwner: n.nameWithOwner,
          url: n.url,
          description: n.description,
          language: n.primaryLanguage?.name ?? null,
          stars: n.stargazerCount,
          forks: n.forkCount,
        }));
    } catch {
      // cai para o HTML abaixo
    }
  }
  try {
    const html = await (await fetch(`https://github.com/${user}`)).text();
    const names = [
      ...new Set(
        [...html.matchAll(/pinned-item-list-item-content[\s\S]*?href="\/([\w.-]+\/[\w.-]+)"/g)].map((m) => m[1]),
      ),
    ].slice(0, 6);
    const repos = await Promise.all(names.map((n) => api<RestRepo>(`/repos/${n}`)));
    return repos.filter((r): r is RestRepo => !!r).map((r) => ({
      nameWithOwner: r.full_name,
      url: r.html_url,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
    }));
  } catch {
    return [];
  }
}

/* Últimos eventos públicos, sem repetir o mesmo tipo seguido no mesmo repositório. */
async function getActivity(user: string): Promise<ActivityEvent[]> {
  const events = await api<{ type: string; repo: { name: string }; created_at: string; payload: { action?: string } }[]>(
    `/users/${user}/events/public?per_page=40`,
  );
  const out: ActivityEvent[] = [];
  for (const e of events ?? []) {
    const last = out[out.length - 1];
    if (last && last.type === e.type && last.repo === e.repo.name) continue;
    out.push({ type: e.type, repo: e.repo.name, at: e.created_at, action: e.payload.action ?? null });
    if (out.length === 7) break;
  }
  return out;
}

const FALLBACK = { repos: 11, followers: 23, stars: 361, contributions: 1456 };

/* O calendário público de contribuições não exige token: é o mesmo HTML do perfil. */
async function getContributions(user: string) {
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`);
    if (!res.ok) throw new Error();
    const html = await res.text();
    const tips = new Map(
      [...html.matchAll(/for="(contribution-day-component-[\d-]+)"[^>]*>([^<]*)/g)].map((m) => [m[1], m[2]]),
    );
    const weeks: ContributionDay[][] = [];
    let total = 0;
    for (const m of html.matchAll(/data-date="([\d-]+)" id="contribution-day-component-(\d+)-(\d+)" data-level="(\d)"/g)) {
      const [, date, day, week, level] = m;
      const count = Number(/^(\d+) contribution/.exec(tips.get(`contribution-day-component-${day}-${week}`) ?? "")?.[1] ?? 0);
      total += count;
      (weeks[+week] ??= [])[+day] = { date, level: +level, count };
    }
    return weeks.length ? { total, weeks } : { total: FALLBACK.contributions, weeks: [] };
  } catch {
    return { total: FALLBACK.contributions, weeks: [] };
  }
}

export const getGitHub = cache(async (user: string): Promise<GitHubData> => {
  const [profile, list, contributions, pinned, activity] = await Promise.all([
    api<{ public_repos: number; followers: number }>(`/users/${user}`),
    api<
      {
        name: string;
        html_url: string;
        description: string | null;
        language: string | null;
        stargazers_count: number;
        pushed_at: string;
        fork: boolean;
      }[]
    >(`/users/${user}/repos?per_page=100&sort=pushed`),
    getContributions(user),
    getPinned(user),
    getActivity(user),
  ]);

  // O repositório com o README do perfil não é um projeto
  const own = (list ?? []).filter((r) => !r.fork && r.name.toLowerCase() !== user.toLowerCase());

  const bytes = new Map<string, number>();
  const langs = await Promise.all(own.map((r) => api<Record<string, number>>(`/repos/${user}/${r.name}/languages`)));
  langs.forEach((l) => Object.entries(l ?? {}).forEach(([k, v]) => bytes.set(k, (bytes.get(k) ?? 0) + v)));
  const sum = [...bytes.values()].reduce((a, b) => a + b, 0) || 1;
  const sorted = [...bytes.entries()].sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 6).map(([name, v]) => ({ name, share: v / sum }));
  const rest = 1 - top.reduce((a, b) => a + b.share, 0);
  if (sorted.length > 6 && rest > 0) top.push({ name: "Other", share: rest });

  return {
    repos: profile?.public_repos ?? FALLBACK.repos,
    followers: profile?.followers ?? FALLBACK.followers,
    stars: list ? (list.filter((r) => !r.fork).reduce((n, r) => n + r.stargazers_count, 0)) : FALLBACK.stars,
    topRepos: [...own]
      .sort((a, b) => b.stargazers_count - a.stargazers_count || b.pushed_at.localeCompare(a.pushed_at))
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
      })),
    languages: list ? top : [],
    contributions,
    pinned,
    activity,
  };
});

/* Cores oficiais do GitHub Linguist para as linguagens que aparecem no perfil. */
export const LANGUAGE_COLORS: Record<string, string> = {
  Java: "#b07219",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Verilog: "#b2b7f8",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Kotlin: "#A97BFF",
  Shell: "#89e051",
  Other: "#8b949e",
};
