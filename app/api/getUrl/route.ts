import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { postAudioToSupa } from "@/app/post-audio-to-supabase";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

export async function GET(request: Request) {
  const url = new URL(request.url);
  return NextResponse.json(url);
}
