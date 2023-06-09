import "./globals.css";
import AudioForm from "./audio-form";

export const metadata = {
  title: "Transcribe!",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex flex-col justify-center items-center  mt-4">
          {children}
        </main>
      </body>
    </html>
  );
}
