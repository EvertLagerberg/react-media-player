import { Media } from "@/types";
import { useRef, useState } from "react";
import IconButton from "./iconButton";

interface PlayerProps {
  media: Media;
  playPreviousMedia: () => void;
  playNextMedia: () => void;
}

const Player = ({ media, playPreviousMedia, playNextMedia }: PlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { sources } = media;
  const url = sources[0];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleLoadStart = () => {
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleEnded = () => {
    playNextMedia();
  };

  const fastBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const fastForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  return (
    <>
      <div className="relative w-full pb-[56.25%]">
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <video
            ref={videoRef}
            src={url}
            onLoadStart={handleLoadStart}
            onPlaying={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="flex justify-between w-full py-4">
        <IconButton iconName="previous" onClick={playPreviousMedia} />
        <IconButton iconName="backward" onClick={fastBackward} />
        <IconButton
          iconName={isPlaying ? "pause" : "play"}
          onClick={togglePlay}
        />
        <IconButton iconName="forward" onClick={fastForward} />
        <IconButton iconName="next" onClick={playNextMedia} />
      </div>
    </>
  );
};

export default Player;
