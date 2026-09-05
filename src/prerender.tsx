import { createRoot, type Root } from "react-dom/client";
import App from "./App";

let root: Root | null = null;

/**
 * Renders the app into the current (JSDOM) document and returns the resulting
 * markup and head tags. Used by the build-time prerenderer so every public URL
 * ships real HTML, not an empty shell.
 */
export async function renderPage(): Promise<{ html: string; head: string; title: string }> {
  const container = document.getElementById("root") as HTMLElement;
  if (root) {
    root.unmount();
    root = null;
  }
  container.innerHTML = "";
  root = createRoot(container);
  root.render(<App />);
  await new Promise((resolve) => setTimeout(resolve, 150));
  return { html: container.innerHTML, head: document.head.innerHTML, title: document.title };
}
