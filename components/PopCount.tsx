"use client";

import { useEffect, useState } from "react";
import { getPopCount, subscribePopCount } from "@/lib/popCount";

// Renders the running pop counter. Reads from the shared module-level
// store so the count survives client-side navigation between pages.
export default function PopCount() {
  const [count, setCount] = useState(getPopCount);

  useEffect(() => {
    // Sync once on mount in case pops happened while we were unmounted.
    setCount(getPopCount());
    return subscribePopCount(setCount);
  }, []);

  return <span>{count}</span>;
}
