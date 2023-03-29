// import { IncomingForm } from "formidable";
// import { NextApiRequest, NextApiResponse } from "next";
// import fetch from "node-fetch";
// import fs from "fs";

// export async function POST(
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<NextApiResponse> {
//   return new Promise((resolve, reject) => {
//     const form = new IncomingForm();

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         reject(err);
//       } else {
//         const audioFile = files.inputAudio as any;

//         // Read the audio file as a binary Buffer
//         const audioData = fs.readFileSync(audioFile.path);
//         console.log(audioData);
//         // try {
//         //   const response = await fetch(
//         //     "https://api.replicate.com/v1/predictions",
//         //     {
//         //       method: "POST",
//         //       headers: {
//         //         Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
//         //         "Content-Type": "application/json",
//         //       },
//         //       body: JSON.stringify({
//         //         version:
//         //           "e39e354773466b955265e969568deb7da217804d8e771ea8c9cd0cef6591f8bc",
//         //         input: {
//         //           audio: Array.from(audioData), // Send the binary data as an array
//         //         },
//         //       }),
//         //     }
//         //   );

//         //   if (response.status !== 201) {
//         //     let error = await response.json();
//         //     res.statusCode = 500;
//         //     res.end(JSON.stringify({ detail: error }));
//         //     return;
//         //   }

//         //   const prediction = await response.json();
//         //   res.statusCode = 201;
//         //   res.end(JSON.stringify(prediction));
//         // } catch (error) {
//         //   console.error("Error running the model:", error);
//         // }
//       }
//     });
//   });
// }
