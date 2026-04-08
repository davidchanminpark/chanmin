import { ReactNode } from "react";

export default function MediaFrame({
  children,
  className = "",
  as: Tag = "div",
  featured = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
  featured?: boolean;
}) {
  return (
    <Tag
      data-square-blocker
      className={`group transition-transform duration-300 hover:-translate-y-1 ${className}`}
      style={{
        background: featured ? "var(--surface-high)" : "var(--surface-low)",
        border: featured
          ? "1px solid var(--primary)"
          : "1px solid var(--outline-variant)",
        boxShadow: featured ? "0 10px 30px rgba(0,0,0,0.08)" : "none",
      }}
    >
      {children}
    </Tag>
  );
}
