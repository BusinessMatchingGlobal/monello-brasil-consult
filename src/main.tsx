import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import { loadCatalogue, startPageTranslator } from "./lib/pageTranslator";

const mount = () => createRoot(document.getElementById("root")!).render(<App />);

// DE/ES/FR pages load their catalogue first so visitors never see the source text.
loadCatalogue(window.location.pathname)
  .then(active => {
    if (active) startPageTranslator();
  })
  .catch(error => console.warn("[translator] catalogue unavailable", error))
  .finally(mount);
