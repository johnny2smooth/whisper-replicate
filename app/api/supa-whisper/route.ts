import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { postAudioToSupa } from "@/app/post-audio-to-supabase";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

export async function GET(request: Request) {
  const url = new URL(request.url);
  console.log(url);
  return NextResponse.json(url);
}

// export async function POST(request: NextRequest) {
//   const { fileName } = await request.json();
//   return new Response(request.body);
//   let audioURL = postAudioToSupa(fileName, file)
// }

// async function uploadAudioToSupabase(base64Audio: string, fileName: string) {
//   const { data, error } = await supabase.storage
//     .from("audio")
//     .upload(`${fileName}`, base64Audio.split(",")[1], {
//       contentType: "audio/mpeg",
//       upsert: false,
//     });

//   if (error) {
//     throw error;
//   }

//   const url = `${
//     process.env.SUPABASE_URL
//   }/storage/v1/object/public/audio/${encodeURIComponent(fileName)}`;
//   return url;
// }
