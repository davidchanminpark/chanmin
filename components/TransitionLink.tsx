"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type CSSProperties, type MouseEvent, type ReactNode, useRef } from "react";

const TRANSITION_MS = 180;

type Props = LinkProps & {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  target?: string;
  rel?: string;
  prefetch?: boolean | null;
};

function hrefToString(href: LinkProps["href"]): string | null {
  if (typeof href === "string") return href;
  if ("pathname" in href && typeof href.pathname === "string") return href.pathname;
  return null;
}

export default function TransitionLink({
  href,
  children,
  onClick,
  target,
  ...props
}: Props & {
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const timeoutRef = useRef<number | null>(null);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (
      target === "_blank" ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    const nextPath = hrefToString(href);
    if (!nextPath || nextPath === pathname) return;

    event.preventDefault();
    document.body.classList.add("route-transitioning");

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      router.push(nextPath);
    }, TRANSITION_MS);
  };

  return (
    <Link href={href} target={target} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
