import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="stack">
      <h4 className="font-mono text-4xl">output</h4>
      <div className="border-purple-400 border-2 border-solid w-[90vw] max-w-3xl p-4 stack ">
        {children}
      </div>
      <Link href="/" className="font-mono text-xl underline underline-offset-2">
        <span className="text-2xl text-green-400 animate-pulse">&larr;</span>
        transcribe another file
      </Link>
    </div>
  );
}
