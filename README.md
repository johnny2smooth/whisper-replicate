# An Interface to help my team transcribe patient interviews

As we know, talking to your users is best way to get ideas. We collected over 1,400 minutes of interviews with our users. We asked them
about their experience with our product, what they liked, what they didn't like, and what they wanted to see in the future. The problem
is that we have to transcribe all of these interviews. That is going to take a LOT of time. Unless... we could have a computer do all of the work for us.

**Transcription Tool:** https://whisper-replicate.vercel.app/

![a preview of what the tool looks like](https://vzocljdcgkqzpnuvoiwa.supabase.co/storage/v1/object/public/README%20photos/Screenshot%202023-04-21%20at%201.30.44%20PM.png?t=2023-04-21T20%3A31%3A34.282Z)

## How It's Made

**Tech used:** TypeScript, JavaScript, Replicate, Whisper, HTML, CSS, Tailwind, Next.js, Supabase, Vercel

This project was built manily using [Replicate](https://replicate.com/explore) and [SupaBase](https://supabase.com/). If you're unfamiliar with Replicate, "_You can use Replicate to run machine learning models in the cloud from your own code, without having to set up any servers_". The main selling point to use Replicate, for me, is that you can tap into Replicate's _BLAZINGLY_ fast GPUs. So all of the audio files that I needed to transcripe with [openai/whisper](https://openai.com/research/whisper) could have a very quick turnaround time for the end user. For example, if I run whisper locally on my own computer, it will process a 40 minute long audio file in about an hour. But if I run it on Replicate, it will process the same audio file in about 50 seconds.

Replicate takes a URI (a real link) to the audio files that it is going to process. To make sure that I am giving Replicate what it requires, I pre-load audio files to a Supabase storage database. Once Supabase processes a file, I send back the URI to Replicate. Replicate then processes the audio file and returns the transcription.

I used Next.js to build the frontend and logic and Tailwind to style it. I used Supabase to store the data and Vercel to deploy it.

## Optimizations

Using Replicate can be expensive, so I want to make sure that I am Authorizing the user before they can use the tool. I was running this tool locally as a precaucion against unwanted users possibly finding and using this tool. I will use Supabase's Row Level Security (RLS) to enforce that a user is from a certain email domain before they can use the tool.

I also want to be able to store the transcription in the database. I will use Supabase's Storage API to store the transcription as a text file. So that if a user needs to re-download the transcription, they can do so.

## Lessons Learned

One of the major roadblocks that I encountered was that I was blocking the UI while making so many fetch() requests. I learned that I was creating a waterfall effect. I was making a request, waiting for the response, then making another request, and so on. So to navigate this, I made sure that I was fetching data incrementally. I would fetch the data that I needed, then update the UI, then fetch the next piece of data that I needed. This way, the UI is never blocked and the user can continue to use the tool.
