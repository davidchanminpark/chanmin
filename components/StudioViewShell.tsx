"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type ViewKey = "home" | "code" | "music" | "vlogs";
type TransitionPhase = "idle" | "exiting" | "entering";

const TRANSITION_MS = 180;

function getViewFromHash(hash: string): ViewKey {
  switch (hash.replace("#", "")) {
    case "code":
      return "code";
    case "music":
      return "music";
    case "vlogs":
      return "vlogs";
    default:
      return "home";
  }
}

function ViewPanel({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  return (
    <div
      aria-hidden={!active}
      style={{ display: active ? "block" : "none" }}
    >
      {children}
    </div>
  );
}

export default function StudioViewShell({
  home,
  code,
  music,
  vlogs,
}: {
  home: ReactNode;
  code: ReactNode;
  music: ReactNode;
  vlogs: ReactNode;
}) {
  const [view, setView] = useState<ViewKey>("home");
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const swapTimeoutRef = useRef<number | null>(null);
  const settleTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const updateView = () => {
      const nextView = getViewFromHash(window.location.hash);
      window.scrollTo({ top: 0, behavior: "auto" });

      if (nextView === view) return;

      if (swapTimeoutRef.current) {
        window.clearTimeout(swapTimeoutRef.current);
      }
      if (settleTimeoutRef.current) {
        window.clearTimeout(settleTimeoutRef.current);
      }

      setPhase("exiting");
      swapTimeoutRef.current = window.setTimeout(() => {
        setView(nextView);
        setPhase("entering");

        settleTimeoutRef.current = window.setTimeout(() => {
          setPhase("idle");
        }, TRANSITION_MS);
      }, TRANSITION_MS);
    };

    updateView();
    window.addEventListener("hashchange", updateView);
    return () => {
      window.removeEventListener("hashchange", updateView);
      if (swapTimeoutRef.current) {
        window.clearTimeout(swapTimeoutRef.current);
      }
      if (settleTimeoutRef.current) {
        window.clearTimeout(settleTimeoutRef.current);
      }
    };
  }, [view]);

  useEffect(() => {
    document.body.classList.remove("studio-view-exiting", "studio-view-entering");

    if (phase === "exiting") {
      document.body.classList.add("studio-view-exiting");
    } else if (phase === "entering") {
      document.body.classList.add("studio-view-entering");
    }

    return () => {
      document.body.classList.remove("studio-view-exiting", "studio-view-entering");
    };
  }, [phase]);

  return (
    <div className={`studio-view-shell studio-view-shell--${phase}`}>
      <ViewPanel active={view === "home"}>{home}</ViewPanel>
      <ViewPanel active={view === "code"}>{code}</ViewPanel>
      <ViewPanel active={view === "music"}>{music}</ViewPanel>
      <ViewPanel active={view === "vlogs"}>{vlogs}</ViewPanel>
    </div>
  );
}
