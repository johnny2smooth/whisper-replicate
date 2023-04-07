"use client";
import { useEffect, useState } from "react";
import type { Prediction } from "@/replicate";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Prediction({ prediction }: { prediction: Prediction }) {
  const [updatedPrediction, setUpdatedPrediction] = useState<Prediction>({
    ...prediction,
  });

  console.log(prediction);
  useEffect(() => {}, [prediction]);

  return (
    <>
      <p>I predict that {prediction.id} will finish soon!</p>
      <p>{prediction.output}</p>
    </>
  );
}
