import { Prediction as PredictionType } from "@/replicate";
import Prediction from "./prediction";
import { Suspense } from "react";
import LoadingSinWave from "../loading-sin-wave";

export const dynamicParams = true;

export default async function Page({ params }: { params: any }) {
  let url = "";
  if (params.supabaseFile !== "custom-service-worker.js") {
    url = createSupabaseUrl(params.supabaseFile);
  }
  let prediction = await getPrediction(url);

  return (
    <div>
      <Suspense
        fallback={<LoadingSinWave fromVia="from-slate-900 via-slate-300" />}
      >
        {/* @ts-expect-error Async Server Component */}
        <Prediction predictionId={prediction.id} />
      </Suspense>
    </div>
  );
}

function createSupabaseUrl(fileName: string) {
  return `${
    process.env.NEXT_PUBLIC_SUPABASE_URL
  }/storage/v1/object/public/audio/${encodeURIComponent(fileName)}`;
}

async function getPrediction(url: string) {
  let response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    mode: "no-cors",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version:
        "e39e354773466b955265e969568deb7da217804d8e771ea8c9cd0cef6591f8bc",
      input: { audio: url.length > 0 && url },
    }),
  });

  return (await response.json()) as PredictionType;
}
