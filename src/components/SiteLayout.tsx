import { Outlet } from "react-router-dom";
import { Nav } from "@/pages/AboutUs";
import { SiteContactForm } from "@/components/SiteContactForm";
import { SiteFooter } from "@/components/SiteFooter";

/** Wraps pages that have no own chrome with the main header, shared contact form and full footer. */
export function SiteLayout() {
  return (
    <>
      <Nav />
      <div className="h-16 md:h-20" aria-hidden="true" />
      <Outlet />
      <SiteContactForm />
      <SiteFooter />
    </>
  );
}
