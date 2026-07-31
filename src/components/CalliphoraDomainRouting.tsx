import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CALLIPHORA_HOSTS = ["calliphora.flights", "www.calliphora.flights"];
/** Paths that belong to the Calliphora brand and may be served on calliphora.flights */
const CALLIPHORA_PATHS = ["/voli", "/formfly"];
const BMG_ORIGIN = "https://businessmatching.global";

export function isCalliphoraHost(host: string) {
  return CALLIPHORA_HOSTS.includes(host.toLowerCase());
}

/**
 * On calliphora.flights:
 *  - "/" (or any non-Calliphora path) → /voli for the root, otherwise back to businessmatching.global
 */
export function CalliphoraDomainRouting() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isCalliphoraHost(window.location.hostname)) return;

    const path = location.pathname.replace(/\/+$/, "") || "/";
    if (CALLIPHORA_PATHS.includes(path.toLowerCase())) return;

    if (path === "/") {
      navigate("/voli", { replace: true });
      return;
    }

    // Any other page belongs to Business Matching Global
    window.location.replace(BMG_ORIGIN + location.pathname + location.search + location.hash);
  }, [location, navigate]);

  return null;
}

export default CalliphoraDomainRouting;
