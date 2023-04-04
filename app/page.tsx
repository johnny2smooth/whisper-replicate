import AudioForm from "./audio-form";

export const revalidate = 0;

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/supa-whisper");
  // let url = await response.json();
  // console.log(url);

  return (
    <main className="flex flex-col justify-center items-center stack mt-4">
      <AudioForm />
      <p>pathname:</p>
    </main>
  );
}

// outside
// import { FormEvent } from "react";
// type Prediction = {
//   completed_at?: string | null;
//   created_at?: string | null;
//   error?: string | null;
//   id?: string | null;
//   input?: {
//     audio?: string | null;
//   };
//   logs?: null;
//   metrics?: {};
//   output?: null;
//   started_at?: null;
//   status?: string | null;
//   urls?: {
//     get?: string | URL;
//     cancel?: string | URL;
//   };
//   version?: string;
//   webhook_completed?: string | null;
//   url?: string | null;
//   detail?: string | null;
// };
// import { createClient } from "@supabase/supabase-js";
// import { useState, useCallback } from "react";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";
// import { postAudioToSupa } from "./post-audio-to-supabase";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// inside

// const [prediction, setPrediction] = useState<Prediction>({});

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
