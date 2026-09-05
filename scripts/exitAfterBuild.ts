import type { Plugin } from "vite";

/**
 * Prerendering loads the whole app inside JSDOM, which leaves handles behind
 * (widgets, observers, sockets) that keep the build process alive long after
 * dist/ is fully written. Vite has nothing left to do at this point, so exit
 * explicitly with success once every closeBundle hook has run.
 */
export function exitAfterBuildPlugin(): Plugin {
  return {
    name: "bmg-exit-after-build",
    apply: "build",
    enforce: "post",
    closeBundle() {
      if (process.env.BMG_NO_FORCE_EXIT) return;
      const timer = setTimeout(() => process.exit(0), 1000);
      timer.unref?.();
    },
  };
}
