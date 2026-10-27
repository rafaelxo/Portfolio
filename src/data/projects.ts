export type ProjectImage =
  | { kind: "screenshot"; src: string; alt: string }
  | { kind: "phones"; srcs: string[]; alt: string }
  | { kind: "mock"; variant: "algoflow" | "postable" | "hostly" | "timeawards" | "cards" };

export interface ProjectLink {
  label: "code" | "live";
  href: string;
}

export interface Project {
  slug: "pragma" | "agentCockpit" | "algoflow" | "hostly" | "timeAwards" | "cards" | "postable" | "aeds";
  /* live: no ar · npm: pacote publicado · repo: código aberto · private: repositório privado */
  status: "live" | "npm" | "repo" | "private";
  /* sem owner/repo (repositório privado) não há estrelas para buscar */
  owner?: string;
  repo?: string;
  fallbackStars?: number;
  technologies: string[];
  links: ProjectLink[];
  image?: ProjectImage;
  installCommand?: string;
}

export const projects: Project[] = [
  {
    slug: "pragma",
    status: "private",
    technologies: ["Flutter", "Dart", "TypeScript", "Go", "Supabase", "PostgreSQL", "OpenAI", "WebRTC", "Drift"],
    links: [],
    image: {
      kind: "phones",
      srcs: ["/projects/pragma-learn.jpg", "/projects/pragma-speak.jpg", "/projects/pragma-fluency.jpg"],
      alt: "Telas do Pragma: trilha de lições, conversa com o Synth e Fluency Map",
    },
  },
  {
    slug: "agentCockpit",
    status: "npm",
    owner: "agent-cockpit",
    repo: "agent-cockpit",
    fallbackStars: 30,
    technologies: ["Node.js", "TypeScript", "React", "Vite", "SQLite", "WebSockets", "Zustand", "Canvas 2D", "Claude Code", "Codex"],
    links: [{ label: "code", href: "https://github.com/agent-cockpit/agent-cockpit" }],
    image: {
      kind: "screenshot",
      src: "/projects/agent-cockpit-start.png",
      alt: "Agent Cockpit start page",
    },
    installCommand: "npx @agentcockpit/agent-cockpit",
  },
  {
    slug: "algoflow",
    status: "live",
    owner: "TheAlgoFlow",
    repo: "AlgoFlow",
    fallbackStars: 8,
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "Docker"],
    links: [
      { label: "code", href: "https://github.com/TheAlgoFlow/AlgoFlow" },
      { label: "live", href: "https://thealgoflow.com" },
    ],
    image: { kind: "mock", variant: "algoflow" },
  },
  {
    slug: "hostly",
    status: "repo",
    owner: "hostly-tp",
    repo: "Hostly",
    fallbackStars: 3,
    technologies: ["Go", "net/http", "React", "TypeScript", "Vite", "Zustand", "React Leaflet"],
    links: [{ label: "code", href: "https://github.com/hostly-tp/Hostly" }],
    image: { kind: "mock", variant: "hostly" },
  },
  {
    slug: "timeAwards",
    status: "repo",
    owner: "rafaelxo",
    repo: "TimeAwards",
    fallbackStars: 173,
    technologies: ["Java", "Spark", "PostgreSQL", "Azure OpenAI", "Tesseract.js", "Web Speech API", "Chart.js"],
    links: [{ label: "code", href: "https://github.com/rafaelxo/TimeAwards" }],
    image: { kind: "mock", variant: "timeawards" },
  },
  {
    slug: "cards",
    status: "repo",
    owner: "rafaelxo",
    repo: "CARDS",
    fallbackStars: 1,
    technologies: ["Python", "OpenCV", "RapidOCR", "ONNX Runtime", "Tkinter", "openpyxl", "PyInstaller"],
    links: [{ label: "code", href: "https://github.com/rafaelxo/CARDS" }],
    image: { kind: "mock", variant: "cards" },
  },
  {
    slug: "postable",
    status: "live",
    owner: "postable-org",
    repo: "postable",
    fallbackStars: 2,
    technologies: ["Next.js", "React", "TypeScript", "Go", "chi", "PostgreSQL", "Stripe", "Python", "FastAPI", "Google Gemini"],
    links: [
      { label: "code", href: "https://github.com/postable-org/postable" },
      { label: "live", href: "https://app.thepostable.com" },
    ],
    image: { kind: "mock", variant: "postable" },
  },
  {
    slug: "aeds",
    status: "repo",
    owner: "rafaelxo",
    repo: "AEDs",
    fallbackStars: 172,
    technologies: ["C", "C++", "Java", "Go"],
    links: [{ label: "code", href: "https://github.com/rafaelxo/AEDs" }],
  },
];
