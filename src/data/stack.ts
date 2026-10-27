export type StackCategory = "languages" | "backend" | "frontend" | "mobile" | "data" | "cloud" | "ai";

export interface StackItem {
  name: string;
  category: StackCategory;
}

/* Tirado do que aparece de fato nos repositórios (públicos e privados). */
export const stack: StackItem[] = [
  { name: "TypeScript", category: "languages" },
  { name: "Go", category: "languages" },
  { name: "Java", category: "languages" },
  { name: "Python", category: "languages" },
  { name: "Dart", category: "languages" },
  { name: "JavaScript", category: "languages" },
  { name: "C/C++", category: "languages" },

  { name: "Node.js", category: "backend" },
  { name: "Go (net/http, chi)", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "Spark (Java)", category: "backend" },
  { name: "Edge Functions (Deno)", category: "backend" },
  { name: "WebSockets", category: "backend" },
  { name: "REST", category: "backend" },

  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Vite", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Zustand", category: "frontend" },
  { name: "TanStack Query", category: "frontend" },

  { name: "Flutter", category: "mobile" },
  { name: "Electron", category: "mobile" },
  { name: "Tkinter", category: "mobile" },

  { name: "PostgreSQL", category: "data" },
  { name: "Supabase", category: "data" },
  { name: "SQLite / Drift", category: "data" },
  { name: "MySQL", category: "data" },

  { name: "Docker", category: "cloud" },
  { name: "Vercel", category: "cloud" },
  { name: "Azure", category: "cloud" },
  { name: "AWS", category: "cloud" },
  { name: "GitHub Actions", category: "cloud" },
  { name: "Vitest", category: "cloud" },

  { name: "OpenAI (texto, voz, visão)", category: "ai" },
  { name: "Google Gemini", category: "ai" },
  { name: "OCR (RapidOCR, Tesseract)", category: "ai" },
  { name: "WebRTC", category: "ai" },
  { name: "Claude Code", category: "ai" },
  { name: "Codex", category: "ai" },
];
