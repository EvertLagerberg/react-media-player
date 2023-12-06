import { Media } from "@/types";
import { useRef, useState } from "react";
import IconButton from "./iconButton";

interface MediaPlayerProps {
  media: Media;
  playPreviousMedia: () => void;
  playNextMedia: () => void;
}

const MediaPlayer = ({
  media,
  playPreviousMedia,
  playNextMedia,
}: MediaPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { sources, title } = media;
  const url = sources[0];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
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

  const playPrev = () => {
    playPreviousMedia();
    setIsPlaying(false);
  };

  const playNext = () => {
    playNextMedia();
    setIsPlaying(false);
  };

  return (
    <div>
      <video ref={videoRef} src={url} controls />
      <div className="flex justify-between">
        <IconButton iconName="previous" onClick={playPrev} />
        <IconButton iconName="backward" onClick={fastBackward} />
        <IconButton
          iconName={isPlaying ? "pause" : "play"}
          onClick={togglePlay}
        />
        <IconButton iconName="forward" onClick={fastForward} />
        <IconButton iconName="next" onClick={playNext} />
      </div>
    </div>
  );
};

export default MediaPlayer;
