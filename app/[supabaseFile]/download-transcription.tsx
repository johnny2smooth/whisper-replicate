"use client";

export default function DownloadTranscription({
  transcript,
}: {
  transcript: string;
}) {
  const downloadFile = () => {
    const link = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    link.download = "transcription.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <button
      onClick={downloadFile}
      className="font-mono border-solid border-2 border-green-400 self-end p-4 bg-green-400 text-black"
    >
      Download .txt
    </button>
  );
}
