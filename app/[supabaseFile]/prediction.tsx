import type { Prediction } from "@/replicate";
import { ClientOutput } from "./client-output";
import LoadingSinWave from "./loading-sin-wave";

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
          <LoadingSinWave />
          <ClientOutput predictionLogs={prediction.logs as string} />
        </>
      ) : prediction.status === "canceled" ? (
        <h1>canceled</h1>
      ) : (
        <>
          <h4>donezo</h4>
          <pre>{JSON.stringify(prediction, null, 2)}</pre>
        </>
      )}
    </>
  );
}
