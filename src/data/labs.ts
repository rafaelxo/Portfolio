export interface LabRepo {
  slug: "aeds" | "leetcode" | "arqcs";
  repo: string;
  href: string;
  tags: string[];
}

export const labs: LabRepo[] = [
  {
    slug: "aeds",
    repo: "AEDs",
    href: "https://github.com/rafaelxo/AEDs",
    tags: ["C", "C++", "Java", "Go"],
  },
  {
    slug: "leetcode",
    repo: "LeetCode",
    href: "https://github.com/rafaelxo/LeetCode",
    tags: ["C++", "Java", "Kotlin", "JavaScript"],
  },
  {
    slug: "arqcs",
    repo: "ARQCs",
    href: "https://github.com/rafaelxo/ARQCs",
    tags: ["Verilog", "Logisim", "Python"],
  },
];
