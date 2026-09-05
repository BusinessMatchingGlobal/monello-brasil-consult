import { createRoot, type Root } from "react-dom/client";
import App from "./App";

let root: Root | null = null;

/**
 * Renders the app into the current (JSDOM) document and returns the resulting
 * markup and head tags. Used by the build-time prerenderer so every public URL
 * ships real HTML, not an empty shell.
 *
 * Each render mounts into a fresh #root element: unmounting a previous tree
 * can fail when page scripts (e.g. consent widgets) moved DOM nodes around,
 * so we discard the old container instead of relying on a clean unmount.
 */
export async function renderPage(): Promise<{ html: string; head: string; title: string }> {
  const oldContainer = document.getElementById("root") as HTMLElement;
  try {
    root?.unmount();
  } catch {
    // Previous tree was externally mutated; dropping the container is enough.
  }
  root = null;

  const container = oldContainer.cloneNode(false) as HTMLElement;
  oldContainer.replaceWith(container);

  root = createRoot(container);
  root.render(<App />);
  await new Promise((resolve) => setTimeout(resolve, 150));
  return { html: container.innerHTML, head: document.head.innerHTML, title: document.title };
}
