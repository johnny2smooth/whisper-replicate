import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  const id = searchParams.get("id");
  const response = await fetch(
    "https://api.replicate.com/v1/predictions/" + id,
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status !== 200) {
    let error = await response.json();
    return NextResponse.json({ detail: error });
  }

  const prediction = await response.json();
  console.log(prediction);
  return NextResponse.json(prediction);
}

export async function POST(request: Request) {
  const { url } = await request.json();
  const response = await fetch("https://api.replicate.com/v1/predictions", {
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
  let prediction = await response.json();

  return NextResponse.json(prediction);
}

// const idResponse = await fetch(
//   "https://api.replicate.com/v1/predictions/" + prediction.id,
//   {
//     headers: {
//       Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
//       "Content-Type": "application/json",
//     },
//   }
// );
// const idPrediction = await idResponse.json();
// console.log(idPrediction);
