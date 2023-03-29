import { createClient } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export function POST(request: NextRequest) {
  console.log(request.body);
  return new Response(request.body);
  // let audioURL = uploadAudioToSupabase()
}

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
