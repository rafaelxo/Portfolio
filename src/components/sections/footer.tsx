import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { social } from "@/data/social";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="text-center text-sm text-muted-foreground sm:text-left">
          <p className="font-medium text-foreground">Rafael Xavier Oliveira</p>
          <p>{t("role")}</p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <span className="font-mono text-xs text-muted-foreground">
            © {year}
          </span>
        </div>
      </Container>
    </footer>
  );
}
