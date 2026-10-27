import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-faint">
        <p>
          © {year} Rafael Xavier Oliveira, {t("line")}
        </p>
      </Container>
    </footer>
  );
}
