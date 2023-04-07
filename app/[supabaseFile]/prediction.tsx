"use client";
import { useEffect, useState } from "react";
import type { Prediction } from "@/replicate";

export default function Prediction({ id, audio }: { id: string | null, audio: string | null }) {
  const [prediction, setPrediction] = useState<Prediction>({completed_at: "",
    created_at: "",
    error: null,
    id: "",
    input: {
        audio: string | null;
    };
    logs: string | null;
    metrics: {};
    output: string | null;
    started_at: string | null;
    status: string | null;
    urls: {
        get: string;
        cancel: string;
    };
    version: string;
    webhook_completed: string | null;});

  useEffect(() => {}, [prediction]);

  return <p>I predict that {prediction.id} will finish soon!</p>;
}

// import { createClient } from "@supabase/supabase-js";
// import { useState, useCallback } from "react";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";
// import { postAudioToSupa } from "./post-audio-to-supabase";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// inside


// const [error, setError] = useState<string>("");
// const router = useRouter();
// const searchParams = useSearchParams();
// const pathname = usePathname();

// const createQueryString = useCallback(
//   (name: string, value: string) => {
//     const params = new URLSearchParams(searchParams);
//     params.set(name, value);

//     return params.toString();
//   },
//   [searchParams]
// );

// async function handleSubmit(e: FormEvent) {
//   e.preventDefault();

//   const inputAudio = document.getElementById(
//     "inputAudio"
//   ) as HTMLInputElement;

//   if (inputAudio.files) {
//     const { url, data, error } = await postAudioToSupa(
//       inputAudio.files[0].name,
//       inputAudio.files[0]
//     );
// setSupabaseUrl(url);
// router.refresh();
// console.log(url);
// if (!error) {
//   const response = await fetch("api/hello", {
//     method: "POST",
//     body: JSON.stringify({ url }),
//   });

//   let whisperInit = await response.json();
//   setPrediction(whisperInit);
//   router.push(pathname + "?" + createQueryString("id", whisperInit.id));
//   let i = 0;
//   while (i < 7) {
//     await sleep(1000);
//     console.log("prediction initiated");
//     const whisper = await fetch("api/hello");
//     let predictionStatus = await whisper.json();
//     console.log(predictionStatus);
//     setPrediction(predictionStatus);
//     i++;
//   }

// }
//   }
// }
