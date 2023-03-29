"use client";
import { FormEvent } from "react";
import AudioForm from "./audio-form";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function postAudioToSupa(fileName: string, file: string) {
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
    process.env.SUPABASE_URL
  }/storage/v1/object/public/audio/${encodeURIComponent(fileName)}`;
  return url;
}

export default function Home() {
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const inputAudio = document.getElementById(
      "inputAudio"
    ) as HTMLInputElement;

    if (inputAudio.files) {
      // handle this step on client -> then send off api request for below
      // tell the user that we got their file and it is being uploaded to a DB
      // Once we get a response back from the DB, we tell them we are sending to a model
      // but we can do all of that here for now...
      const { data, error } = await supabase.storage
        .from("audio")
        .upload(
          inputAudio.files[0].name.split(".")[0] +
            String(inputAudio.files[0].size),
          inputAudio.files[0],
          {
            contentType: "audio/mpeg",
          }
        );
      if (error) {
        console.error(error);
      }
      if (data) {
        const url = `${
          process.env.NEXT_PUBLIC_SUPABASE_URL
        }/storage/v1/object/public/audio/${encodeURIComponent(data?.path)}`;
        const response = await fetch("api/hello", {
          method: "POST",
          body: url,
        });
      }
    }
  }

  return (
    <main className="flex flex-col justify-center items-center stack mt-4">
      <AudioForm handleSubmit={handleSubmit} />
    </main>
  );
}
