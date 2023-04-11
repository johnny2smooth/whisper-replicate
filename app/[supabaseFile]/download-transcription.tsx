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

  return <button onClick={downloadFile}>Download .txt</button>;
}
