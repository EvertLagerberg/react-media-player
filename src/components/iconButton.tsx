import Image from "next/image";

interface IconButtonProps {
  iconName: string;
  onClick: () => void;
}

const IconButton = ({ iconName, onClick }: IconButtonProps) => {
  return (
    <button onClick={onClick} className="bg-black rounded-md">
      <Image
        src={`/icons/${iconName}.svg`}
        alt={iconName}
        className="dark:invert"
        width={48}
        height={48}
      />
    </button>
  );
};

export default IconButton;
