export default function Loading() {
  return (
    <main className="grain flex-1 pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-8">
        <div
          className="animate-pulse rounded-2xl p-8 md:p-10"
          style={{
            background: "rgba(252, 249, 243, 0.7)",
            border: "1px solid rgba(186,186,176,0.18)",
          }}
        >
          <div
            className="h-3 w-24 rounded-full mb-8"
            style={{ background: "rgba(129,129,120,0.22)" }}
          />
          <div
            className="h-14 w-64 md:w-96 rounded-2xl mb-4"
            style={{ background: "rgba(106,92,76,0.12)" }}
          />
          <div
            className="h-14 w-48 md:w-72 rounded-2xl mb-8"
            style={{ background: "rgba(106,92,76,0.12)" }}
          />
          <div
            className="h-4 w-full max-w-2xl rounded-full mb-3"
            style={{ background: "rgba(129,129,120,0.16)" }}
          />
          <div
            className="h-4 w-full max-w-xl rounded-full mb-10"
            style={{ background: "rgba(129,129,120,0.16)" }}
          />
          <div className="flex gap-4 flex-wrap">
            <div
              className="h-10 w-32 rounded-full"
              style={{ background: "rgba(106,92,76,0.16)" }}
            />
            <div
              className="h-10 w-24 rounded-full"
              style={{ background: "rgba(129,129,120,0.14)" }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
