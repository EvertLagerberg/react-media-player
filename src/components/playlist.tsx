import { Media } from "@/types";

const backgroundVariants = {
  active: "dark:bg-zinc-800/90",
  inactive: "dark:bg-zinc-800/50",
};

interface PlaylistItemProps {
  media: Media;
  isActive: boolean;
  children?: React.ReactNode;
}
const PlaylistItem = ({ media, isActive, children }: PlaylistItemProps) => {
  return (
    <div
      className={`flex flex-col gap-4 p-4 bg-gray-200 rounded-xl ${
        backgroundVariants[isActive ? "active" : "inactive"]
      }`}
    >
      <h2 className={`text-xl font-mono ${isActive && "font-bold"}`}>
        {media.title}
      </h2>
      <p className={`text-xs font-mono ${isActive && "font-bold"}`}>
        {media.description}
      </p>
      {children}
    </div>
  );
};

interface PlaylistProps {
  playlist: Media[];
  currentIndex: number;
  removeMedia: (index: number) => void;
}

const Playlist = ({ playlist, currentIndex, removeMedia }: PlaylistProps) => {
  return (
    <>
      {playlist.map((media, index) => {
        const onClickRemove = () => removeMedia(index);
        return (
          <PlaylistItem
            key={media.title}
            media={media}
            isActive={index === currentIndex}
          >
            <button
              onClick={onClickRemove}
              className="bg-red-400 rounded-md h-8 w-24 self-center"
            >
              Remove
            </button>
          </PlaylistItem>
        );
      })}
    </>
  );
};

export default Playlist;
