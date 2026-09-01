"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { routing } from "@/i18n/routing";

// No middleware in this static export, so the bare "/" route needs its own
// redirect to the default locale segment (e.g. "/en").
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${routing.defaultLocale}`);
  }, [router]);

  return null;
}
