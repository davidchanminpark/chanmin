"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteTransitionManager() {
  const pathname = usePathname();

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      document.body.classList.remove("route-transitioning");
    });

    return () => window.cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
