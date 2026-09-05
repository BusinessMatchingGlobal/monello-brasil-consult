import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { sitemapPlugin } from "./scripts/sitemap";
import { prerenderPlugin } from "./scripts/prerender";
import { mcpContentPlugin } from "./scripts/mcpContent";
import { exitAfterBuildPlugin } from "./scripts/exitAfterBuild";

import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    sitemapPlugin(),
    prerenderPlugin(),
    mcpContentPlugin(),
    mcpPlugin(),
    mode === "development" && componentTagger(),
    exitAfterBuildPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
