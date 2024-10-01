type Props = {
  imageURL: string | null;
  width?: string;
  height?: string;
  handleClick?: () => void;
  onLoad?: () => void;
};

export default function ProfileImage({
  imageURL,
  width = "w-9",
  height = "h-9",
  handleClick,
  onLoad,
}: Props) {
  const imageSrc = imageURL ? imageURL : "blank-user.png";

  return (
    <img
      onClick={handleClick}
      src={imageSrc}
      className={`${width} ${height} border-[1px] border-blackHowl rounded-full
 bg-slate-50 cursor-pointer object-cover`}
      alt="user profile picture"
      onLoad={onLoad}
    />
  );
}
