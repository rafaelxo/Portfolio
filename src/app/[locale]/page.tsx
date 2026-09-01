import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { EngineeringFocus } from "@/components/sections/engineering-focus";
import { SelectedProjects } from "@/components/sections/selected-projects";
import { MoreEngineering } from "@/components/sections/more-engineering";
import { TechStack } from "@/components/sections/tech-stack";
import { About } from "@/components/sections/about";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <EngineeringFocus />
      <SelectedProjects />
      <MoreEngineering />
      <TechStack />
      <About />
      <Education />
      <Contact />
    </>
  );
}
