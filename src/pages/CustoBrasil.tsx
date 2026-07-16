import { useEffect } from "react";

const TARGET = "https://www.linkedin.com/company/109746306/admin/page-posts/published/";

export default function CustoBrasil() {
  useEffect(() => {
    window.location.replace(TARGET);
  }, []);
  return (
    <main className="min-h-screen flex items-center justify-center p-6 text-center">
      <p className="text-sm text-foreground/70">
        Redirecting to Custo Brasil on LinkedIn…{" "}
        <a href={TARGET} target="_blank" rel="noopener" className="underline">
          Click here if you are not redirected.
        </a>
      </p>
    </main>
  );
}