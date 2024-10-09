import { Bars3Icon } from "@heroicons/react/16/solid";

type Props = {
  width?: string;
  height?: string;
  backgroundColor?: string;
  stripeColor?: string;
  handleClick: () => void;
};

export default function Hamburger({
  width = "w-8",
  height = "h-8",
  backgroundColor = "bg-absenceOfColor",
  stripeColor = "text-white",
  handleClick,
}: Props) {
  return (
    <Bars3Icon
      onClick={handleClick}
      className={`${height} ${backgroundColor} ${stripeColor} ${width}`}
    />
  );
}
