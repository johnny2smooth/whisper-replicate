export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="stack">
      <h4 className="font-mono text-4xl">output</h4>
      <div className="border-purple-400 border-2 border-solid w-[90vw] max-w-3xl p-4 stack ">
        {children}
      </div>
    </div>
  );
}
