export type StackCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "data"
  | "cloud"
  | "ai";

export interface StackItem {
  name: string;
  category: StackCategory;
}

export const stack: StackItem[] = [
  // Languages
  { name: "Go", category: "languages" },
  { name: "TypeScript", category: "languages" },
  { name: "JavaScript", category: "languages" },
  { name: "Python", category: "languages" },
  { name: "Java", category: "languages" },

  // Frontend
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Vite", category: "frontend" },

  // Backend
  { name: "Go · chi", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "WebSockets", category: "backend" },
  { name: "JWT", category: "backend" },

  // Data
  { name: "PostgreSQL", category: "data" },
  { name: "MySQL", category: "data" },
  { name: "SQLite", category: "data" },

  // Cloud & DevOps
  { name: "Docker", category: "cloud" },
  { name: "Azure", category: "cloud" },
  { name: "AWS", category: "cloud" },
  { name: "Supabase", category: "cloud" },
  { name: "Vercel", category: "cloud" },
  { name: "Stripe", category: "cloud" },

  // AI & Tooling
  { name: "Google Gemini", category: "ai" },
  { name: "Claude Code", category: "ai" },
  { name: "Codex", category: "ai" },
];
