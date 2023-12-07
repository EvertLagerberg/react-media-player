import Player from "@/components/player";
import media from "@/media.json";
import { useState } from "react";
import Playlist from "@/components/playlist";
import { Media } from "@/types";
import AddMediaForm from "./addMediaForm";

const MediaPlayer = () => {
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
    if (current === index) {
      setCurrent(0);
    } else if (current > index) {
      setCurrent(current - 1);
    }
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
    <div className="flex flex-col gap-2 w-full">
      {!!playlist.length ? (
        <>
          <Player
            media={playlist[current]}
            playPreviousMedia={playPreviousMedia}
            playNextMedia={playNextMedia}
          />
          <Playlist
            playlist={playlist}
            current={current}
            removeMedia={removeMedia}
          />
        </>
      ) : (
        <p className="text-2xl self-center">No media in playlist</p>
      )}
      <AddMediaForm onSubmit={addMedia} />
    </div>
  );
};

export default MediaPlayer;
