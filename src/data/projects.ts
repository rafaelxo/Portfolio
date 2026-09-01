export type ProjectImage =
  | { kind: "screenshot"; src: string; alt: string }
  | { kind: "mock"; variant: "agent" | "algoflow" | "postable" | "hostly" };

export interface ProjectLink {
  label: "code" | "live";
  href: string;
}

export interface Project {
  slug: "agentCockpit" | "algoflow" | "postable" | "hostly";
  tier: 1 | 2;
  owner: string;
  repo: string;
  fallbackStars: number;
  technologies: string[];
  links: ProjectLink[];
  image: ProjectImage;
  installCommand?: string;
}

export const projects: Project[] = [
  {
    slug: "agentCockpit",
    tier: 1,
    owner: "agent-cockpit",
    repo: "agent-cockpit",
    fallbackStars: 29,
    technologies: [
      "Node.js",
      "TypeScript",
      "React",
      "Vite",
      "SQLite",
      "WebSockets",
      "Zustand",
      "Canvas 2D",
      "Claude Code",
      "Codex",
    ],
    links: [
      { label: "code", href: "https://github.com/agent-cockpit/agent-cockpit" },
    ],
    image: {
      kind: "screenshot",
      src: "/projects/agent-cockpit-start.png",
      alt: "Agent Cockpit start page",
    },
    installCommand: "npx @agentcockpit/agent-cockpit",
  },
  {
    slug: "algoflow",
    tier: 1,
    owner: "TheAlgoFlow",
    repo: "AlgoFlow",
    fallbackStars: 8,
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Python",
      "FastAPI",
      "Docker",
    ],
    links: [
      { label: "code", href: "https://github.com/TheAlgoFlow/AlgoFlow" },
      { label: "live", href: "https://thealgoflow.com" },
    ],
    image: { kind: "mock", variant: "algoflow" },
  },
  {
    slug: "postable",
    tier: 1,
    owner: "postable-org",
    repo: "postable",
    fallbackStars: 2,
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Go",
      "chi",
      "PostgreSQL",
      "JWT",
      "Stripe",
      "Python",
      "FastAPI",
      "Google Gemini",
    ],
    links: [
      { label: "code", href: "https://github.com/postable-org/postable" },
      { label: "live", href: "https://app.thepostable.com" },
    ],
    image: { kind: "mock", variant: "postable" },
  },
  {
    slug: "hostly",
    tier: 1,
    owner: "hostly-tp",
    repo: "Hostly",
    fallbackStars: 3,
    technologies: [
      "Go",
      "net/http",
      "React",
      "TypeScript",
      "Vite",
      "Zustand",
      "React Leaflet",
    ],
    links: [{ label: "code", href: "https://github.com/hostly-tp/Hostly" }],
    image: { kind: "mock", variant: "hostly" },
  },
];
