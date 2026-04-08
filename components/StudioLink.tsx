"use client";

import Link, { type LinkProps } from "next/link";
import { type CSSProperties, type MouseEvent, type ReactNode } from "react";

type Props = LinkProps & {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

function hrefToString(href: LinkProps["href"]): string | null {
  if (typeof href === "string") return href;
  if ("pathname" in href && typeof href.pathname === "string") {
    const params = new URLSearchParams();
    if (href.query) {
      for (const [key, value] of Object.entries(href.query)) {
        if (value == null) continue;
        if (Array.isArray(value)) {
          for (const entry of value) {
            params.append(key, String(entry));
          }
        } else {
          params.set(key, String(value));
        }
      }
    }
    const query = params.toString() ? `?${params.toString()}` : "";
    const hash = typeof href.hash === "string" ? `#${href.hash}` : "";
    return `${href.pathname}${query}${hash}`;
  }
  return null;
}

export default function StudioLink({
  href,
  children,
  onClick,
  ...props
}: Props & {
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const nextHref = hrefToString(href);
    if (!nextHref || !nextHref.startsWith("/#") && nextHref !== "/") {
      return;
    }

    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    window.history.pushState({}, "", nextHref);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
