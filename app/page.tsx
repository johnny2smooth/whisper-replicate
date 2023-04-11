import AudioForm from "./audio-form";

export const revalidate = 0;
export default async function Home() {
  return (
    <>
      <AudioForm />
      {/* <LoadingSinWave fromVia="from-slate-900 via-slate-300" /> */}
    </>
  );
}
