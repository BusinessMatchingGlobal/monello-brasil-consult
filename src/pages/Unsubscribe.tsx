import { Link } from "react-router-dom";
import { useCanonical } from "@/lib/useCanonical";

export default function Unsubscribe() {
  useCanonical("/unsubscribe", {
    title: "Unsubscribe | Business Matching Global",
    description: "Manage your subscription preferences.",
  });

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-5 border border-border rounded-xl p-8 bg-card shadow-sm">
        <h1 className="text-2xl font-semibold">Unsubscribe</h1>
        <p className="text-muted-foreground">
          Every email we send includes an unsubscribe link at the bottom. Please use that link to stop
          receiving messages from Business Matching Global.
        </p>
        <p className="text-muted-foreground">
          If you no longer have one of our emails, write to{" "}
          <a href="mailto:info@businessmatching.global" className="text-primary hover:underline">
            info@businessmatching.global
          </a>{" "}
          and we will remove your address.
        </p>
        <Link to="/" className="inline-block text-sm text-primary hover:underline">
          Back to website
        </Link>
      </div>
    </main>
  );
}
