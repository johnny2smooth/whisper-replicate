"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function ClientOutput({ predictionLogs }: { predictionLogs: string }) {
  const router = useRouter();

  useEffect(() => {
    const sleep = setTimeout(() => {
      console.log("so refreshing");
      router.refresh();
    }, 2000);
    () => clearTimeout(sleep);
  });

  return (
    <>
      {predictionLogs !== null &&
        predictionLogs
          .split("\n")
          .map((log: string) => (
            <p key={log}>
              {log.includes("%")
                ? `${log.split("|")[0]} ${log.split("|")[1]}`
                : `${log.split("|")[0]}`}
            </p>
          ))}
    </>
  );
}
