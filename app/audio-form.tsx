"use client";
import { DragEvent, MouseEvent, ChangeEvent, FormEvent, useState } from "react";
import { postAudioToSupa } from "./post-audio-to-supabase";
import { useRouter } from "next/navigation";

export default function AudioForm() {
  const router = useRouter();

  function handleDragEnter(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-white");
    e.currentTarget.classList.add(`border-green-200`);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add(`border-green-200`);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove(`border-green-200`);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;

    let uploadedFile = document.getElementById("file-example") as HTMLElement;
    const inputAudio = document.getElementById(
      "inputAudio"
    ) as HTMLInputElement;

    if (files[0].type.startsWith("audio")) {
      e.currentTarget.classList.remove(`border-green-200`);
      e.currentTarget.classList.add(`border-green-600`);
      inputAudio.files = files;
      if (inputAudio.files.length > 0) {
        uploadedFile.textContent = inputAudio.files[0].name;
        uploadedFile.classList.add(`text-green-200`, "opacity-100");
      }
    } else {
      uploadedFile.textContent = "invalid file type";
      e.currentTarget.classList.remove(`border-green-200`);
      e.currentTarget.classList.add(`border-red-600`);
      uploadedFile.classList.add("text-red-200", "opacity-100");
      // disable submit button
    }
  }

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    const inputAudio = document.getElementById(
      "inputAudio"
    ) as HTMLInputElement;
    inputAudio.click();
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files?.length > 0) {
      let uploadedFile = document.getElementById("file-example") as HTMLElement;
      uploadedFile.textContent = e.target.files[0].name;
      uploadedFile.classList.add(`text-green-200`, "opacity-100");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const inputAudio = document.getElementById(
      "inputAudio"
    ) as HTMLInputElement;

    if (inputAudio.files) {
      const { data, error } = await postAudioToSupa(
        inputAudio.files[0].name,
        inputAudio.files[0]
      );
      // setSupabaseUrl(url);
      router.push("/" + data.path);
      router.refresh();
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
    }
  }

  return (
    <>
      <h4 className="font-mono text-4xl">input</h4>
      <form
        onSubmit={handleSubmit}
        className="border-white border-2 border-solid w-1/2 p-4 stack"
      >
        <div className="flex flex-col stack">
          <label htmlFor="inputAudio">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block mr-2"
              role="presentation"
            >
              <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <code className="bg-slate-700 p-2">audio</code>
          </label>
          <input
            type="file"
            name="inputAudio"
            id="inputAudio"
            className="hidden"
            accept=".mp3,mp4,.zip"
            onChange={handleChange}
            required
          />
          <div
            id="dropbox"
            className="flex flex-col justify-center items-center gap-4 h-36 text-shade border-white border-2 border-opacity-90 border-dashed cursor-pointer my-auto px-4"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <div className="flex gap-4 font-mono">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon"
                role="presentation"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <p>
                Drop or click to select an{" "}
                <span className="underline">audio file</span>
              </p>
            </div>
            <div
              className="font-mono text-gray-100 opacity-50"
              id="file-example"
            >
              patient-interview.mp3
            </div>
          </div>
        </div>
        <div className="flex justify-end ">
          <button
            type="submit"
            className="border border-1 border-green-300 p-2"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
