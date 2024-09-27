type Props = {
  imageURL: string | undefined;
  width?: string;
  height?: string;
};

export default function ProfileImage({
  imageURL,
  width = "w-9",
  height = "h-9",
}: Props) {
  const imageSrc = imageURL
    ? `${import.meta.env.VITE_BASE_URL}${imageURL}`
    : "blank-user.png";

  return (
    <img
      src={imageSrc}
      className={`${width} ${height} border-[1px] border-blackHowl rounded-full
 bg-slate-50 cursor-pointer object-cover`}
      alt="user profile picture"
    />
  );
}
