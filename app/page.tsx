import { getURL } from "next/dist/shared/lib/utils";
import AudioForm from "./audio-form";

export const revalidate = 0;
export default async function Home() {
  return (
    <main className="flex flex-col justify-center items-center stack mt-4">
      <AudioForm />
    </main>
  );
}
