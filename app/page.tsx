"use client";
import { DragEvent, MouseEvent, ChangeEvent } from "react";

export default function Home() {
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
    e.currentTarget.classList.remove(`border-green-200`);
    e.currentTarget.classList.add(`border-green-600`);

    const files = e.dataTransfer.files;
    const inputAudio = document.getElementById(
      "input-audio"
    ) as HTMLInputElement;
    inputAudio.files = files;
    if (inputAudio.files.length > 0) {
      let uploadedFile = document.getElementById("file-example") as HTMLElement;
      uploadedFile.textContent = inputAudio.files[0].name;
      uploadedFile.classList.add(`text-green-200`, "opacity-100");
      // e.currentTarget.appendChild(uploadedFile);
    }
  }

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    const inputAudio = document.getElementById(
      "input-audio"
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

  return (
    <main className="flex flex-col justify-center items-center stack mt-4">
      <h4 className="font-mono text-4xl">input</h4>
      <form
        action="/api/transcribe"
        className="border-white border-2 border-solid w-1/2 p-4 stack"
      >
        <div className="flex flex-col stack">
          <label htmlFor="input-audio">
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
            name="input-audio"
            id="input-audio"
            className="hidden"
            onChange={handleChange}
          />
          <div
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
              Drop a file or click to select
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
    </main>
  );
}
