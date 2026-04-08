"use client";

import { useEffect, useRef, useState } from "react";
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

type PaletteKey = "home" | "code" | "music" | "vlogs";

// rgb tuples — lightweight pastels that stay behind content.
// Keep these as "r, g, b" strings so we can reuse the existing rgba logic.
const palettes: Record<PaletteKey, [string, string]> = {
  // Default landing: warm beiges (soft, minimal)
  home: ["240, 226, 210", "245, 236, 224"],
  // Code: greens (fresh, still subtle)
  code: ["224, 246, 233", "206, 234, 216"],
  // Music: light blue + light grey
  music: ["229, 240, 255", "226, 230, 236"],
  // Vlogs: light pink + very light pink
  vlogs: ["252, 222, 226", "255, 238, 241"],
};

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
  palette: [string, string],
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
  palette: [string, string],
  topMin?: number,
  topMax?: number,
): Square {
  const maxAttempts = 12;
  let candidate = makeSquare(boundHeight, palette, topMin, topMax);
  let attempts = 0;
  while (isNested(candidate, existing, vw, vh) && attempts < maxAttempts) {
    candidate = makeSquare(boundHeight, palette, topMin, topMax);
    attempts++;
  }
  return candidate;
}

function generateSquares(boundHeight: number, palette: [string, string]): Square[] {
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
    squares.push(placeNonNested(boundHeight, squares, vw, vh, palette));
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
  const [paletteKey, setPaletteKey] = useState<PaletteKey>("home");
  const [squares, setSquares] = useState<Square[] | null>(null);
  const [docHeight, setDocHeight] = useState(0);

  const squaresRef = useRef<Square[] | null>(null);
  const boundHeightRef = useRef(0);
  // Cache generated square sets keyed by `${paletteKey}:${bucket}` so
  // crossing a width breakpoint (or returning to a previously-visited
  // palette) reuses the exact same rectangles instead of regenerating.
  // A bound shift past BOUND_THRESHOLD_PX invalidates the current entry.
  const bucketCacheRef = useRef<Map<string, Square[]>>(new Map());
  const hoveredIdRef = useRef<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [appearingIds, setAppearingIds] = useState<Set<number>>(new Set());
  const popAudioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    squaresRef.current = squares;
    // Mirror the live square set into the cache for the current
    // (palette, bucket). This captures pop/replace mutations so that
    // crossing a breakpoint and coming back preserves popped state.
    if (squares && typeof window !== "undefined") {
      const w = window.innerWidth;
      const bucket = w < 768 ? 0 : w < 1440 ? 1 : w < 1920 ? 2 : 3;
      bucketCacheRef.current.set(`${paletteKey}:${bucket}`, squares);
    }
  }, [squares, paletteKey]);

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

  // Choose palette from the hash. The site lives entirely at `/` and uses
  // hash navigation (#code / #music / #vlogs) to switch views.
  useEffect(() => {
    const computeKey = (): PaletteKey => {
      const hash = window.location.hash || "";
      if (hash === "#code") return "code";
      if (hash === "#music") return "music";
      if (hash === "#vlogs") return "vlogs";
      return "home";
    };

    const update = () => setPaletteKey(computeKey());
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  // Regenerate on every navigation and on every full page load. On plain
  // resize, update the wrapper height live but only regenerate when the
  // viewport crosses a density bucket or the content bound shifts enough
  // to matter — the squares already reflow for free via vw/vh/% units.
  useEffect(() => {
    // Width buckets correspond to the breakpoints used by makeSquare and
    // generateSquares (768 / 1440 / 1920). Within a bucket, count and size
    // ranges are identical, so regeneration produces a visually equivalent
    // layout and is wasted work.
    const getWidthBucket = (w: number): number => {
      if (w < 768) return 0;
      if (w < 1440) return 1;
      if (w < 1920) return 2;
      return 3;
    };

    // Boundary threshold matches the 200px margin makeSquare already uses
    // for its topMax — smaller shifts don't change what placements are legal.
    const BOUND_THRESHOLD_PX = 200;
    const REGEN_DEBOUNCE_MS = 200;

    const readBound = (): number => {
      const footer = document.querySelector("footer");
      return footer
        ? footer.offsetTop
        : Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
            window.innerHeight,
          );
    };

    let lastBucket = getWidthBucket(window.innerWidth);
    let lastBoundAtRegen = 0;

    const cacheKey = (bucket: number) => `${paletteKey}:${bucket}`;

    const updateBounds = () => {
      const bound = readBound();
      boundHeightRef.current = bound;
      setDocHeight(bound);
      return bound;
    };

    // Resolve the square set for the current (palette, bucket): return a
    // cached set if one exists, otherwise generate + cache. `force: true`
    // bypasses the cache and overwrites it (used when the content bound
    // drifts past the threshold and cached placements no longer fit).
    const resolveSquares = (
      bound: number,
      { force }: { force: boolean },
    ): Square[] => {
      const bucket = getWidthBucket(window.innerWidth);
      const key = cacheKey(bucket);
      const cached = bucketCacheRef.current.get(key);
      if (cached && !force) {
        lastBucket = bucket;
        lastBoundAtRegen = bound;
        return cached;
      }
      const fresh = generateSquares(bound, palettes[paletteKey]);
      bucketCacheRef.current.set(key, fresh);
      lastBucket = bucket;
      lastBoundAtRegen = bound;
      return fresh;
    };

    const applySquares = (bound: number, opts: { force: boolean }) => {
      setSquares(resolveSquares(bound, opts));
    };

    // Initial render for this palette: prefer cache (so returning to a
    // palette shows the same rectangles), fall back to generating.
    const initialBound = updateBounds();
    applySquares(initialBound, { force: false });

    let boundsRaf = 0;
    let regenTimeout: number | null = null;

    const scheduleMaybeRegen = () => {
      if (regenTimeout !== null) {
        window.clearTimeout(regenTimeout);
      }
      regenTimeout = window.setTimeout(() => {
        regenTimeout = null;
        const bound = boundHeightRef.current;
        const bucketChanged = getWidthBucket(window.innerWidth) !== lastBucket;
        const boundChanged =
          Math.abs(bound - lastBoundAtRegen) > BOUND_THRESHOLD_PX;
        if (bucketChanged) {
          // Pull from cache if we've visited this bucket before, otherwise
          // generate once and store it. Subsequent crossings are free.
          applySquares(bound, { force: false });
        } else if (boundChanged) {
          // Content height moved enough that cached placements for this
          // bucket may no longer fit — invalidate and regenerate.
          applySquares(bound, { force: true });
        }
      }, REGEN_DEBOUNCE_MS);
    };

    const onResize = () => {
      if (boundsRaf) window.cancelAnimationFrame(boundsRaf);
      boundsRaf = window.requestAnimationFrame(() => {
        updateBounds();
        scheduleMaybeRegen();
      });
    };

    const settleTimeoutId = window.setTimeout(() => {
      const bound = updateBounds();
      // If late-streaming content shifted the bound past the threshold,
      // invalidate this bucket's cache and regenerate so placements fit.
      if (Math.abs(bound - lastBoundAtRegen) > BOUND_THRESHOLD_PX) {
        applySquares(bound, { force: true });
      }
    }, 250);

    // Footer observer is the meaningful signal for "content bound changed"
    // (e.g. async sections streaming in). The previous document.body
    // observer was dropped because the background layer's own height feeds
    // body size, which risks a feedback loop.
    const footer = document.querySelector("footer");
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(onResize)
        : null;

    if (footer && resizeObserver) {
      resizeObserver.observe(footer);
    }

    window.addEventListener("resize", onResize);

    return () => {
      if (boundsRaf) window.cancelAnimationFrame(boundsRaf);
      window.clearTimeout(settleTimeoutId);
      if (regenTimeout !== null) window.clearTimeout(regenTimeout);
      window.removeEventListener("resize", onResize);
      resizeObserver?.disconnect();
    };
  }, [paletteKey]);

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

      const replacement = placeNonNested(
        bound,
        remaining,
        vw,
        vh,
        palettes[paletteKey],
        topMin,
        topMax,
      );
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
      className="background-squares pointer-events-none absolute top-0 left-4 right-4 md:left-0 md:right-0 -z-10 overflow-hidden"
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
