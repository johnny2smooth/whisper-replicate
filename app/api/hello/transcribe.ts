import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export default async function handler(req: NextRequest, res: NextResponse) {
  console.log(req.body);
  // const replicate = new Replicate({
  //   auth: process.env.REPLICATE_API_TOKEN
  // });

  // const output = await replicate.run(
  //   "openai/whisper:e39e354773466b955265e969568deb7da217804d8e771ea8c9cd0cef6591f8bc",
  //   {
  //     input: {
  //       audio: "..."
  //     }
  //   }
  // );
}
