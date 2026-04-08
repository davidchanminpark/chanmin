"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { incrementPopCount } from "@/lib/popCount";

type Square = {
  id: number;
  color: string;
  top: number;    // px (document-relative)
  left: number;   // % of viewport width
  width: number;  // vw
  height: number; // vh
  opacity: number;
  popping?: boolean;
};

// rgb tuples — sage and pink, matched to the original pastel palette
const palette = ["228, 240, 226", "252, 222, 226"];

let nextSquareId = 0;

// Convert a square's mixed units into a pixel rect for overlap math.
function toRect(s: Square, vw: number, vh: number) {
  return {
    x: (s.left / 100) * vw,
    y: s.top,
    w: (s.width / 100) * vw,
    h: (s.height / 100) * vh,
  };
}

// Returns true if `a` is "mostly inside" any rect in `others`.
// Threshold: more than 60% of either rect's area is covered by the other.
function isNested(
  a: Square,
  others: Square[],
  vw: number,
  vh: number,
): boolean {
  const ra = toRect(a, vw, vh);
  const aArea = ra.w * ra.h;
  if (aArea <= 0) return false;

  for (const o of others) {
    const ro = toRect(o, vw, vh);
    const ix = Math.max(0, Math.min(ra.x + ra.w, ro.x + ro.w) - Math.max(ra.x, ro.x));
    const iy = Math.max(0, Math.min(ra.y + ra.h, ro.y + ro.h) - Math.max(ra.y, ro.y));
    const overlap = ix * iy;
    if (overlap / aArea > 0.6) return true;
    const oArea = ro.w * ro.h;
    if (oArea > 0 && overlap / oArea > 0.6) return true;
  }
  return false;
}

function makeSquare(
  boundHeight: number,
  topMin = 0,
  topMax = Math.max(0, boundHeight - 200),
): Square {
  const viewportWidth = window.innerWidth;
  const isWideScreen = viewportWidth >= 1440;
  const isLargeScreen = viewportWidth >= 1920;
  // Mix of sizes — most are medium, ~20% are "feature" squares
  // that can be as large as half the viewport.
  const isLarge = Math.random() < (isLargeScreen ? 0.38 : isWideScreen ? 0.3 : 0.2);
  const width = isLarge
    ? isLargeScreen
      ? 48 + Math.random() * 22   // 48–70 vw
      : isWideScreen
        ? 42 + Math.random() * 22 // 42–64 vw
        : 38 + Math.random() * 20 // 38–58 vw
    : isLargeScreen
      ? 28 + Math.random() * 22   // 28–50 vw
      : isWideScreen
        ? 24 + Math.random() * 20 // 24–44 vw
        : 20 + Math.random() * 18; // 20–38 vw
  const height = isLarge
    ? isLargeScreen
      ? 36 + Math.random() * 22   // 36–58 vh
      : isWideScreen
        ? 34 + Math.random() * 20 // 34–54 vh
        : 32 + Math.random() * 20 // 32–52 vh
    : isLargeScreen
      ? 20 + Math.random() * 18   // 20–38 vh
      : isWideScreen
        ? 18 + Math.random() * 18 // 18–36 vh
        : 16 + Math.random() * 16; // 16–32 vh

  const low = Math.min(topMin, topMax);
  const high = Math.max(topMin, topMax);

  return {
    id: ++nextSquareId,
    color: palette[Math.floor(Math.random() * palette.length)],
    top: low + Math.random() * (high - low),
    left: Math.random() * 80 - 5, // -5 to 75 — allow slight bleed off left edge
    width,
    height,
    opacity: 0.35 + Math.random() * 0.4,
  };
}

function placeNonNested(
  boundHeight: number,
  existing: Square[],
  vw: number,
  vh: number,
  topMin?: number,
  topMax?: number,
): Square {
  const maxAttempts = 12;
  let candidate = makeSquare(boundHeight, topMin, topMax);
  let attempts = 0;
  while (isNested(candidate, existing, vw, vh) && attempts < maxAttempts) {
    candidate = makeSquare(boundHeight, topMin, topMax);
    attempts++;
  }
  return candidate;
}

function generateSquares(boundHeight: number): Square[] {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  // ~1 square per 20vh of available area, clamped to 16–40
  const densityFactor =
    viewportWidth < 768 ? 0.16 : viewportWidth < 1440 ? 0.145 : 0.2;
  const target = Math.round(boundHeight / (viewportHeight * densityFactor));
  const maxCount =
    viewportWidth < 768 ? 52 : viewportWidth < 1440 ? 66 : 40;
  const minCount =
    viewportWidth < 768 ? 22 : viewportWidth < 1440 ? 28 : 16;
  const count = Math.max(minCount, Math.min(maxCount, target));

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const squares: Square[] = [];
  for (let i = 0; i < count; i++) {
    squares.push(placeNonNested(boundHeight, squares, vw, vh));
  }
  return squares;
}

function isSquareBlockedAtPoint(clientX: number, clientY: number): boolean {
  const topElement = document.elementFromPoint(clientX, clientY);
  if (!(topElement instanceof HTMLElement)) return false;

  return Boolean(
    topElement.closest(
      [
        "[data-square-blocker]",
        "a",
        "button",
        "iframe",
        "input",
        "textarea",
        "select",
        "summary",
        "[role='button']",
        "[role='link']",
      ].join(",")
    )
  );
}

export default function RandomBackground() {
  const pathname = usePathname();
  const [squares, setSquares] = useState<Square[] | null>(null);
  const [docHeight, setDocHeight] = useState(0);

  const squaresRef = useRef<Square[] | null>(null);
  const boundHeightRef = useRef(0);
  const hoveredIdRef = useRef<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [appearingIds, setAppearingIds] = useState<Set<number>>(new Set());
  const popAudioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    squaresRef.current = squares;
  }, [squares]);

  // Preload the pop sound once. Rewinding a single element keeps rapid
  // clicks cheap and avoids creating stray Audio objects.
  useEffect(() => {
    const audio = new Audio("/pop.mp3");
    audio.preload = "auto";
    audio.volume = 0.6;
    popAudioRef.current = audio;
  }, []);

  const playPop = () => {
    const audio = popAudioRef.current;
    if (!audio) return;
    try {
      audio.currentTime = 0;
      void audio.play();
    } catch {
      // audio is a nice-to-have — silently swallow if the browser blocks it
    }
  };

  // Regenerate on every navigation and on every full page load.
  useEffect(() => {
    const measure = () => {
      const footer = document.querySelector("footer");
      const bound = footer
        ? footer.offsetTop
        : Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
            window.innerHeight,
          );
      boundHeightRef.current = bound;
      setDocHeight(bound);
      setSquares(generateSquares(bound));
    };

    let frameId = window.requestAnimationFrame(measure);
    const timeoutId = window.setTimeout(measure, 250);

    const footer = document.querySelector("footer");
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            window.cancelAnimationFrame(frameId);
            frameId = window.requestAnimationFrame(measure);
          })
        : null;

    if (footer && resizeObserver) {
      resizeObserver.observe(footer);
    }

    if (document.body && resizeObserver) {
      resizeObserver.observe(document.body);
    }

    window.addEventListener("resize", measure);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("resize", measure);
      resizeObserver?.disconnect();
    };
  }, [pathname]);

  // Document-level click listener — hit-tests against square rects in doc
  // coordinates so the squares only pop when exposed background is the
  // topmost thing under the pointer, not when UI surfaces sit above them.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const current = squaresRef.current;
      if (!current) return;
      if (isSquareBlockedAtPoint(e.clientX, e.clientY)) return;
      const x = e.clientX + window.scrollX;
      const y = e.clientY + window.scrollY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Walk topmost-first so overlapping squares pop in paint order.
      for (let i = current.length - 1; i >= 0; i--) {
        const s = current[i];
        if (s.popping) continue;
        const r = toRect(s, vw, vh);
        if (x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h) {
          playPop();
          incrementPopCount();
          setSquares(prev =>
            prev
              ? prev.map(sq => (sq.id === s.id ? { ...sq, popping: true } : sq))
              : prev,
          );
          return;
        }
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Hover hit-test: on mousemove, find the topmost square under the
  // pointer and light it up (scale-up + cursor pointer). Uses a ref
  // compare so we only call setState on transitions, not every frame.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const current = squaresRef.current;
      if (!current) return;
      if (isSquareBlockedAtPoint(e.clientX, e.clientY)) {
        if (hoveredIdRef.current !== null) {
          hoveredIdRef.current = null;
          setHoveredId(null);
          document.body.style.cursor = "";
        }
        return;
      }
      const x = e.clientX + window.scrollX;
      const y = e.clientY + window.scrollY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let found: number | null = null;
      for (let i = current.length - 1; i >= 0; i--) {
        const s = current[i];
        if (s.popping) continue;
        const r = toRect(s, vw, vh);
        if (x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h) {
          found = s.id;
          break;
        }
      }

      if (found !== hoveredIdRef.current) {
        hoveredIdRef.current = found;
        setHoveredId(found);
        document.body.style.cursor = found !== null ? "pointer" : "";
      }
    };

    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.body.style.cursor = "";
    };
  }, []);

  // After a popped square finishes its fade-out transition, replace it
  // with a fresh square positioned in the user's current viewport.
  const handleTransitionEnd = (
    id: number,
    e: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (e.propertyName !== "opacity") return;
    setSquares(prev => {
      if (!prev) return prev;
      const target = prev.find(s => s.id === id);
      if (!target || !target.popping) return prev;

      const remaining = prev.filter(s => s.id !== id);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const bound = boundHeightRef.current;
      const scrollY = window.scrollY;

      // Keep the replacement's top within the currently-visible viewport
      // (with a little margin so it's not flush against the edge).
      const topMin = Math.min(bound, scrollY + 40);
      const topMax = Math.min(
        Math.max(0, bound - 200),
        scrollY + vh - 200,
      );

      const replacement = placeNonNested(bound, remaining, vw, vh, topMin, topMax);
      // Mark the new square as "appearing" so it zooms in from a small
      // scale on its next paint.
      setAppearingIds(prev => {
        const next = new Set(prev);
        next.add(replacement.id);
        return next;
      });
      return [...remaining, replacement];
    });
  };

  // After a newly-inserted "appearing" square has painted once at its
  // starting state, clear the flag so the CSS transition runs to the
  // normal resting state. Double rAF to guarantee the first paint lands.
  useEffect(() => {
    if (appearingIds.size === 0) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setAppearingIds(new Set());
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [appearingIds]);

  if (!squares) return null;

  return (
    <div
      aria-hidden
      className="background-squares pointer-events-none absolute left-0 top-0 w-full -z-10 overflow-hidden"
      style={{ height: docHeight }}
    >
      {squares.map(s => {
        const isAppearing = appearingIds.has(s.id);
        const transform = s.popping
          ? "scale(1.18)"
          : isAppearing
            ? "scale(0.35)"
            : s.id === hoveredId
              ? "scale(1.05)"
              : "scale(1)";
        const opacity = s.popping ? 0 : isAppearing ? 0 : 1;
        // Spring-ish easing with slight overshoot for the zoom-in; the same
        // curve handles pop and hover transitions fine at this scale.
        const transition =
          "transform 440ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 320ms ease-out";
        return (
          <div
            key={s.id}
            onTransitionEnd={e => handleTransitionEnd(s.id, e)}
            style={{
              position: "absolute",
              top: `${s.top}px`,
              left: `${s.left}%`,
              width: `${s.width}vw`,
              height: `${s.height}vh`,
              backgroundColor: `rgba(${s.color}, ${s.opacity})`,
              transform,
              opacity,
              transition,
              willChange: "transform, opacity",
            }}
          />
        );
      })}
    </div>
  );
}
