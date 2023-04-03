"use client";
import { FormEvent } from "react";
import AudioForm from "./audio-form";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function postAudioToSupa(fileName: string, file: File) {
  const { data, error } = await supabase.storage
    .from("audio")
    .upload(`${fileName}`, file, {
      contentType: "audio/mpeg",
      upsert: false,
    });
  if (error) {
    throw error;
  }

  const url = `${
    process.env.NEXT_PUBLIC_SUPABASE_URL
  }/storage/v1/object/public/audio/${encodeURIComponent(fileName)}`;
  return { url, data, error };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Prediction = {
  completed_at?: string | null;
  created_at?: string | null;
  error?: string | null;
  id?: string | null;
  input?: {
    audio?: string | null;
  };
  logs?: null;
  metrics?: {};
  output?: null;
  started_at?: null;
  status?: string | null;
  urls?: {
    get?: string | URL;
    cancel?: string | URL;
  };
  version?: string;
  webhook_completed?: string | null;
  url?: string | null;
  detail?: string | null;
};

export default function Home() {
  const [prediction, setPrediction] = useState<Prediction>({});

  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const inputAudio = document.getElementById(
      "inputAudio"
    ) as HTMLInputElement;

    if (inputAudio.files) {
      const { url, data, error } = await postAudioToSupa(
        inputAudio.files[0].name,
        inputAudio.files[0]
      );
      if (!error) {
        const response = await fetch("api/hello", {
          method: "POST",
          body: JSON.stringify({ url }),
        });

        let whisperInit = await response.json();
        setPrediction(whisperInit);
        console.log(prediction);

        while (
          prediction.status &&
          prediction.status !== "succeeded" &&
          prediction.status !== "failed"
        ) {
          await sleep(1000);
          const whisper = await fetch(prediction.urls?.get!, {
            mode: "no-cors",
            headers: {
              Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
              "Content-Type": "application/json",
            },
          });

          let predictionStatus = await whisper.json();

          console.log(predictionStatus);
          setPrediction(predictionStatus);
        }

        // if (whisperInit.status !== 201) {
        //   setError(prediction.detail);
        //   return;
        // }

        // setPrediction(() => whisperInit);

        // if (prediction !== null) {
        //   while (
        //     prediction.status !== "succeeded" &&
        //     prediction.status !== "failed"
        //   ) {
        //     await sleep(1000);
        //     console.log(prediction);
        //     const response = await fetch(
        //       "https://api.replicate.com/v1/predictions/" + prediction.id,
        //       {
        //         headers: {
        //           Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        //           "Content-Type": "application/json",
        //         },
        //       }
        //     );

        //     let whisperPrediction = await response.json();
        //     console.log({ prediction });
        //     setPrediction(() => whisperPrediction);
        //   }
        // }
      }
    }
  }

  return (
    <main className="flex flex-col justify-center items-center stack mt-4">
      <AudioForm handleSubmit={handleSubmit} />
      {/* {error && <div>{error}</div>} */}
      {/* what would really be cool is to stream in the results */}
      {/* {prediction && (
        <div>
          {prediction && (
            <div>
              <pre>{JSON.stringify(prediction, null, 2)}</pre>
            </div>
          )}
          <p>status: {prediction}</p>
        </div>
      )} */}
    </main>
  );
}
