import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export async function postAudioToSupa(fileName: string, file: File) {
  const { data, error } = await supabase.storage
    .from("audio")
    .upload(`${fileName}`, file, {
      contentType: "audio/mpeg",
      upsert: false,
    });
  if (error) {
    throw error;
  }
  return { data, error };
}
