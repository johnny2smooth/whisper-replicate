import { Prediction as PredictionType } from "@/replicate";
import Prediction from "./prediction";

export const dynamicParams = true;
export const revalidate = 0;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default async function Page({ params }: { params: any }) {
  if (params.supabaseFile === "custom-service-worker.js") return;

  const url = createSupabaseUrl(params.supabaseFile);

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
      input: { audio: url },
    }),
  });

  let prediction: PredictionType = await response.json();

  while (
    prediction.status === "starting" ||
    prediction.status === "processing" ||
    prediction.status === "running"
  ) {
    let get = prediction.urls.get;
    let currentResponse = await fetch(get, {
      mode: "no-cors",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    prediction = await currentResponse.json();
    console.log(prediction.status);
    console.log(prediction);
    await sleep(1000);
  }

  if (prediction.status === "finished") {
  }

  // console.log(prediction);

  return (
    <div>
      <h1 className="font-mono">The prediction</h1>
      {prediction && <Prediction prediction={prediction} />}

      {/* {predictionId && (
        <>
          <p>Prediction Id: {predictionId}</p>
          <Prediction prediction={prediction} />
        </>
      )} */}
      {/* pass predictionId to client component that will track updates */}
    </div>
  );
}

function createSupabaseUrl(fileName: string) {
  return `${
    process.env.NEXT_PUBLIC_SUPABASE_URL
  }/storage/v1/object/public/audio/${encodeURIComponent(fileName)}`;
}
