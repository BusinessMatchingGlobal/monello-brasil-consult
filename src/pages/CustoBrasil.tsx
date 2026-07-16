import { useEffect } from "react";

const TARGET = "https://www.linkedin.com/company/109746306/admin/page-posts/published/";

export default function CustoBrasil() {
  useEffect(() => {
    window.location.replace(TARGET);
  }, []);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center gap-4">
      <h1 className="text-2xl md:text-3xl">Custo Brasil — Insights on LinkedIn</h1>
      <p className="text-sm text-foreground/70">
        Redirecting you to our Custo Brasil page on LinkedIn…{" "}
        <a href={TARGET} target="_blank" rel="noopener" className="underline">
          Open the Custo Brasil LinkedIn page
        </a>
      </p>
    </main>
  );
}