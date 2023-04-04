import Prediction from "./prediction";

export const dynamicParams = true;

export default async function Page({ params }: { params: any }) {
  if (params.supabaseFile === "custom-service-worker.js") return;

  const url = createSupabaseUrl(params.supabaseFile);
  //   const response = await fetch("https://api.replicate.com/v1/predictions", {
  //     method: "POST",
  //     mode: "no-cors",
  //     headers: {
  //       Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       version:
  //         "e39e354773466b955265e969568deb7da217804d8e771ea8c9cd0cef6591f8bc",
  //       input: { audio: url },
  //     }),
  //   });

  //   let prediction = await response.json();

  //   console.log(prediction);
  //   router.push(pathname + "?" + createQueryString("id", prediction.id));

  return (
    <div>
      <h1> My Post</h1>

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
