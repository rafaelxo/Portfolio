import { Star } from "lucide-react";
import { ExternalLink } from "./external-link";
import { TechBadge } from "./tech-badge";
import { ProjectVisual } from "./project-visual";
import { CopyCommand } from "./copy-command";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

interface ProjectContent {
  name: string;
  category: string;
  role: string;
  description: string;
  contribution: string;
  challenges: string[];
}

interface ProjectLabels {
  roleLabel: string;
  challengesLabel: string;
  code: string;
  live: string;
  stars: string;
  copyInstall: string;
}

interface ProjectCardProps {
  project: Project;
  stars: number;
  featured?: boolean;
  content: ProjectContent;
  labels: ProjectLabels;
}

export function ProjectCard({
  project,
  stars,
  featured,
  content,
  labels,
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        "grid gap-6 rounded-card border border-border bg-surface p-6 transition-colors sm:p-8",
        featured ? "lg:grid-cols-[1fr_1.05fr]" : "lg:grid-cols-2",
      )}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs text-accent">{content.category}</p>
            <h3 className="mt-1 text-xl font-semibold text-foreground">
              {content.name}
            </h3>
          </div>
          <span
            className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground"
            aria-label={`${stars} ${labels.stars}`}
          >
            <Star className="size-3.5" aria-hidden="true" />
            {stars}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {content.description}
        </p>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {labels.roleLabel} · <span className="text-foreground">{content.role}</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            {content.contribution}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {labels.challengesLabel}
          </p>
          <ul className="mt-2.5 flex flex-col gap-2">
            {content.challenges.map((challenge) => (
              <li key={challenge} className="flex gap-2 text-sm text-foreground/90">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                {challenge}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <ProjectVisual image={project.image} />

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-5">
          {project.links.map((link) => (
            <ExternalLink key={link.href} href={link.href}>
              {link.label === "code" ? labels.code : labels.live}
            </ExternalLink>
          ))}
          {project.installCommand && (
            <CopyCommand
              command={project.installCommand}
              copiedLabel={labels.copyInstall}
            />
          )}
        </div>
      </div>
    </article>
  );
}
