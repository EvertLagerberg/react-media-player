import { Media } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";

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

type Inputs = {
  title: string;
  description: string;
  url: string;
};
interface PlaylistFormProps {
  onSubmit: SubmitHandler<Inputs>;
}

const PlaylistForm = ({ onSubmit }: PlaylistFormProps) => {
  const { register, handleSubmit } = useForm<Inputs>();

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col gap-2 p-4 bg-stone-200 rounded-xl ${backgroundVariants["inactive"]}`}
    >
      <label>
        Title:
        <br />
        <input
          {...register("title", { required: true })}
          className="bg-stone-400"
        />
      </label>
      <label>
        Description:
        <br />
        <input {...register("description")} className="bg-stone-400" />
      </label>
      <label>
        URL:
        <br />
        <input
          {...register("url", { required: true })}
          className="bg-stone-400"
        />
      </label>
      <button type="submit" className="bg-stone-400 rounded-md">
        Add to playlist
      </button>
    </form>
  );
};

interface PlaylistProps {
  playlist: Media[];
  current: number;
  addMedia: (input: Inputs) => void;
  removeMedia: (index: number) => void;
}

const Playlist = ({
  playlist,
  current,
  addMedia,
  removeMedia,
}: PlaylistProps) => {
  return (
    <div className="flex flex-col gap-2">
      {playlist.map((media, index) => {
        const onClickRemove = () => removeMedia(index);
        return (
          <PlaylistItem
            key={media.title}
            media={media}
            isActive={index === current}
          >
            <button
              onClick={onClickRemove}
              className="bg-red-400 text-black rounded-md h-8 w-24 self-center"
            >
              Remove
            </button>
          </PlaylistItem>
        );
      })}
      <PlaylistForm onSubmit={addMedia} />
    </div>
  );
};

export default Playlist;
