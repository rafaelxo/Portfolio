"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyCommand({
  command,
  copiedLabel,
}: {
  command: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — command is still visible to copy manually
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copiedLabel}
      className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-accent"
    >
      <span className="text-muted-foreground">$</span>
      {command}
      {copied ? (
        <Check className="size-3.5 shrink-0 text-accent" aria-hidden="true" />
      ) : (
        <Copy
          className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
