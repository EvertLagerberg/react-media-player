import Player from "@/components/player";
import media from "@/media.json";
import { useState } from "react";
import Playlist from "@/components/playlist";
import { Media } from "@/types";
import AddMediaForm from "./addMediaForm";

const usePlaylist = (defaultPlaylist: Media[]) => {
  const [playlist, setPlaylist] = useState<Media[]>(defaultPlaylist);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    if (currentIndex === index) {
      setCurrentIndex(0);
    } else if (currentIndex > index) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToPrevMedia = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(playlist.length - 1);
    }
  };

  const goToNextMedia = () => {
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return {
    playlist,
    currentIndex,
    addMedia,
    removeMedia,
    goToPrevMedia,
    goToNextMedia,
  };
};

const MediaPlayer = () => {
  const [movies] = media.categories;
  const defaultPlaylist = movies.videos.slice(0, 3);
  const {
    playlist,
    currentIndex,
    goToPrevMedia,
    goToNextMedia,
    addMedia,
    removeMedia,
  } = usePlaylist(defaultPlaylist);

  return (
    <div className="flex flex-col gap-2 w-full">
      {!!playlist.length ? (
        <>
          <Player
            media={playlist[currentIndex]}
            goToPrevMedia={goToPrevMedia}
            goToNextMedia={goToNextMedia}
          />
          <Playlist
            playlist={playlist}
            currentIndex={currentIndex}
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
