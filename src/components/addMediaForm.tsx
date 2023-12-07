import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  title: string;
  description: string;
  url: string;
};
interface AddMediaForm {
  onSubmit: SubmitHandler<Inputs>;
}

const AddMediaForm = ({ onSubmit }: AddMediaForm) => {
  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col items-center w-full gap-2 p-4 bg-stone-200 rounded-xl dark:bg-zinc-800/50`}
    >
      <label>
        Title:
        <br />
        <input
          {...register("title", { required: true })}
          className="text-black"
        />
      </label>
      <label>
        Description:
        <br />
        <input {...register("description")} className="text-black" />
      </label>
      <label>
        URL:
        <br />
        <input
          {...register("url", { required: true })}
          className="text-black"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-400 rounded-md w-[180px] h-8 my-4"
      >
        Add Media
      </button>
    </form>
  );
};

export default AddMediaForm;
