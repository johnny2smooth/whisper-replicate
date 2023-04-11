import type { Prediction } from "@/replicate";
import { ClientOutput } from "./client-output";
import LoadingSinWave from "../loading-sin-wave";
import DownloadTranscription from "./download-transcription";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default async function Prediction({
  predictionId,
}: {
  predictionId: string;
}) {
  let currentResponse = await fetch(
    `https://api.replicate.com/v1/predictions/${predictionId}`,
    {
      mode: "no-cors",
      next: { revalidate: 3 },
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  let prediction: Prediction = await currentResponse.json();

  return (
    <>
      {prediction.status === "starting" ||
      prediction.status === "processing" ||
      prediction.status === "running" ? (
        <>
          <LoadingSinWave fromVia="from-purple-900 via-green-400" />
          <ClientOutput predictionLogs={prediction.logs as string} />
        </>
      ) : prediction.status === "canceled" || prediction.status === "failed" ? (
        <h1>canceled</h1>
      ) : (
        <div className="stack">
          <p className="font-mono">
            {" "}
            We spent{" "}
            <span className="text-purple-400">
              {Math.trunc(prediction.metrics.predict_time * 100) / 100}
            </span>{" "}
            seconds on this transcription
          </p>
          <p>
            It Cost:
            <span className="text-green-400">
              {" "}
              $
              {((Math.trunc(prediction.metrics.predict_time * 100) / 100 / 60) *
                192) /
                1000}
            </span>
          </p>
          <p className="font-mono">{prediction.output.transcription}</p>
          {/* client button that is passed transcription and turns it into .txt file */}
          <DownloadTranscription transcript={prediction.output.transcription} />
        </div>
      )}
    </>
  );
}
