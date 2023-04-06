"use client";
import { DragEvent, MouseEvent, ChangeEvent, FormEvent, useState } from "react";
import { postAudioToSupa } from "./post-audio-to-supabase";
import { useRouter } from "next/navigation";

export default function AudioForm() {
  const [isUploading, setIsUploading] = useState("");
  const [supaUrl, setSupaUrl] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [fileName, setFileName] = useState("");

  const router = useRouter();

  let borderColors = isEmpty
    ? "border-white"
    : isUploading === "isUploading"
    ? "border-purple-400"
    : isUploading === "uploaded"
    ? "border-green-400"
    : "border-red-400";

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

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    const inputAudio = document.getElementById(
      "inputAudio"
    ) as HTMLInputElement;
    inputAudio.click();
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files?.length > 0) {
      // dispatch
      setFileName(e.target.files[0].name);
      setIsEmpty(false);
      setIsUploading("isUploading");

      const { data, error } = await postAudioToSupa(
        e.target.files[0].name,
        e.target.files[0]
      );
      if (error) {
        setIsUploading("failed");
        console.error(error);
      }
      if (data) {
        setIsUploading("uploaded");
        setSupaUrl(data.path);
      }
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const inputAudio = document.getElementById(
      "inputAudio"
    ) as HTMLInputElement;

    if (supaUrl.length > 0) {
      router.push("/" + supaUrl);
    }
  }

  return (
    <>
      <h4 className="font-mono text-4xl">input</h4>
      <form
        onSubmit={handleSubmit}
        className={`${
          isEmpty
            ? "border-white"
            : isUploading === "isUploading"
            ? "border-purple-400"
            : isUploading === "uploaded"
            ? "border-green-400"
            : "border-red-400"
        }  border-2 border-solid w-1/2 p-4 stack transition-colors`}
      >
        <div className={`bg-black flex flex-col stack opacity-100`}>
          <label htmlFor="inputAudio" className={`pt-2 px-4 `}>
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
            className={`${borderColors} border-2 border-opacity-90 border-dashed transition-color duration-500`}
          >
            <div
              id="dropbox"
              className={`${borderColors} flex flex-col justify-center items-center gap-4 min-h-36 text-shade cursor-pointer my-auto px-4 py-6`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
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
                  {isUploading === "isUploading" ? (
                    <>
                      Currently{" "}
                      <span className="text-purple-400">processing</span> your
                    </>
                  ) : isUploading === "uploaded" ? (
                    <>
                      We are ready to{" "}
                      <span className="text-green-400">transcribe</span> your
                    </>
                  ) : isUploading === "failed" ? (
                    "There was an error uploading your"
                  ) : (
                    `Drop or click to select an`
                  )}{" "}
                  <span className="underline">audio file</span>
                  {isUploading === "isUploading" && (
                    <>
                      <span className="animate-pulse delay-100 text-red-400">
                        .
                      </span>
                      <span className="animate-pulse delay-150 text-yellow-400">
                        .
                      </span>
                      <span className="animate-pulse delay-200 text-green-400">
                        .
                      </span>
                    </>
                  )}
                </p>
              </div>
              <div
                className={`${
                  !isEmpty
                    ? "text-green-400 opacity-100"
                    : "text-gray-100 opacity-50"
                } font-mono`}
                id="file-example"
              >
                {!isEmpty ? `${fileName}` : "patient-interview.mp3"}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end ">
          <button
            type="submit"
            className={`${
              isUploading !== "uploaded"
                ? "border-red-300 bg-red-500 text-red-500"
                : "border-green-300 bg-green-400 text-black"
            } border border-1 p-2 transition-color ease-in duration-500 font-bold font-mono`}
            disabled={isUploading !== "uploaded"}
          >
            Submit <span className="animate-pulse">&rarr;</span>
          </button>
        </div>
      </form>
    </>
  );
}
