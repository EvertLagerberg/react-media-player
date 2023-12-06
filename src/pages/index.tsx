import Image from "next/image";
import { Inter } from "next/font/google";
import MediaPlayer from "@/components/mediaPlayer";
import media from "@/media.json";
import { useState } from "react";
import Playlist from "@/components/playlist";
import { Media } from "@/types";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [movies] = media.categories;
  const defaultPlaylist = movies.videos.slice(0, 3);
  const [playlist, setPlaylist] = useState<Media[]>(defaultPlaylist);
  const [current, setCurrent] = useState(0);

  const addMedia = (input: {
    title: string;
    description: string;
    url: string;
  }) => {
    const newMedia = {
      title: input.title,
      description: input.description,
      sources: [input.url],
    };
    setPlaylist([...playlist, newMedia]);
  };

  const removeMedia = (index: number) => {
    const newPlaylist = [...playlist];
    newPlaylist.splice(index, 1);
    setPlaylist(newPlaylist);
  };

  const playPreviousMedia = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      setCurrent(playlist.length - 1);
    }
  };

  const playNextMedia = () => {
    if (current < playlist.length - 1) {
      setCurrent(current + 1);
    } else {
      setCurrent(0);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-48 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          React Media Player Demo by Evert Lagerberg
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <MediaPlayer
        media={playlist[current]}
        playPreviousMedia={playPreviousMedia}
        playNextMedia={playNextMedia}
      />
      <Playlist
        playlist={playlist}
        current={current}
        addMedia={addMedia}
        removeMedia={removeMedia}
      />
    </main>
  );
}
