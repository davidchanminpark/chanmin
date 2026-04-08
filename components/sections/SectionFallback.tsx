export default function SectionFallback({
  eyebrow,
  titleWidth = "18rem",
  subtitleWidth = "32rem",
}: {
  eyebrow?: string;
  titleWidth?: string;
  subtitleWidth?: string;
}) {
  return (
    <section className="max-w-7xl mx-auto px-8 pb-8">
      <div
        className="animate-pulse"
        style={{ borderTop: "1px solid var(--outline-variant)" }}
      >
        {eyebrow && (
          <p
            className="text-xs uppercase tracking-widest mb-6"
            style={{ color: "var(--outline)" }}
          >
            {eyebrow}
          </p>
        )}

        <div
          className="h-14 rounded-2xl mb-4"
          style={{
            width: titleWidth,
            background: "rgba(106,92,76,0.12)",
          }}
        />
        <div
          className="h-5 rounded-full mb-10"
          style={{
            width: subtitleWidth,
            maxWidth: "100%",
            background: "rgba(129,129,120,0.16)",
          }}
        />
        <div
          className="rounded-2xl"
          style={{
            height: "16rem",
            background: "rgba(252, 249, 243, 0.7)",
            border: "1px solid rgba(186,186,176,0.18)",
          }}
        />
      </div>
    </section>
  );
}
