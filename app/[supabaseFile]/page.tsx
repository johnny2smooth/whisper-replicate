export default function Page({ params }: { params: any }) {
  console.log(params);
  const url = `${
    process.env.NEXT_PUBLIC_SUPABASE_URL
  }/storage/v1/object/public/audio/${encodeURIComponent(params.supabaseFile)}`;
  return (
    <div>
      <h1> My Post</h1>
      <p>{url}</p>
      <p>{params.supabaseFile}</p>
    </div>
  );
}
