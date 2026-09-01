import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/data/projects";
import { getRepoStars } from "@/lib/github";

export async function SelectedProjects() {
  const t = await getTranslations("projects");

  const labels = {
    roleLabel: t("roleLabel"),
    challengesLabel: t("challengesLabel"),
    code: t("code"),
    live: t("live"),
    stars: t("stars"),
    copyInstall: t("copyInstall"),
  };

  const cards = await Promise.all(
    projects.map(async (project) => {
      const stars = await getRepoStars(
        project.owner,
        project.repo,
        project.fallbackStars,
      );
      const content = t.raw(`items.${project.slug}`) as {
        name: string;
        category: string;
        role: string;
        description: string;
        contribution: string;
        challenges: string[];
      };
      return { project, stars, content };
    }),
  );

  return (
    <section id="projects" className="scroll-mt-16 border-t border-border py-20 sm:py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          label={t("label")}
          heading={t("heading")}
          subheading={t("subheading")}
        />
        <div className="flex flex-col gap-6">
          {cards.map(({ project, stars, content }) => (
            <ProjectCard
              key={project.slug}
              project={project}
              stars={stars}
              featured={project.tier === 1}
              content={content}
              labels={labels}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
