import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Image
        src="/avatar.svg"
        width={150}
        height={150}
        alt="Chanmin's profile photo"
      />
      <h1>Chanmin</h1>
      <p>
        Hi, I&apos;m Chanmin — a developer, musician, and vlogger. Welcome to
        my corner of the internet.
      </p>
    </main>
  );
}
