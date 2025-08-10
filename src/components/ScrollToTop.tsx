// src/components/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // stop browser from restoring old scroll position
    window.history.scrollRestoration = "manual";

    const doScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    if ("requestAnimationFrame" in window) {
      requestAnimationFrame(() => setTimeout(doScroll, 40));
    } else {
      setTimeout(doScroll, 40);
    }
  }, [pathname]);

  return null;
}
