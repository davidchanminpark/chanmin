"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process?: () => void;
      };
    };
  }
}

export default function InstagramEmbeds() {
  useEffect(() => {
    const processEmbeds = () => {
      window.instgrm?.Embeds?.process?.();
    };

    processEmbeds();

    let attempts = 0;
    const intervalId = window.setInterval(() => {
      attempts += 1;
      processEmbeds();

      if (window.instgrm?.Embeds?.process || attempts >= 20) {
        window.clearInterval(intervalId);
      }
    }, 250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return null;
}
