import { Inter } from "next/font/google";
import MediaPlayer from "@/components/mediaPlayer";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between px-4 py-4 md:px-48 md:py-8 ${inter.className}`}
    >
      <MediaPlayer />
    </main>
  );
}
