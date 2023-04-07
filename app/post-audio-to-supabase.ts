import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export async function postAudioToSupa(
  fileName: string,
  file: File | ArrayBuffer
) {
  let uniqueName = await createUniqueName(fileName);
  const { data, error } = await supabase.storage
    .from("audio")
    .upload(`${uniqueName}`, file, {
      contentType: "audio/mpeg",
      upsert: false,
    });
  if (error) {
    throw error;
  }
  return { data, error };
}

async function createUniqueName(fileName: string) {
  const [ogName, fileType] = fileName.split(".");
  const timestamp = new Date().getTime();
  return `${ogName}-${timestamp}.${fileType}`;
}
