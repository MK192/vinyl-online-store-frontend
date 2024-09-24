import { ReactNode } from "react";

type Props = {
  backgroundColor?: string;
  type?: "submit" | "reset" | "button";
  fullWidth?: boolean;
  handleClick?: () => void;
  variant?: "small" | "medium" | "large";
  children: ReactNode;
};

export default function Button({
  backgroundColor = "absenceOfColor",
  fullWidth = false,
  type = "button",
  variant = "medium",
  handleClick,

  children,
}: Props) {
  let style = fullWidth
    ? `bg-${backgroundColor} rounded-sm p-2 w-full text-wrap`
    : `bg-${backgroundColor} rounded-sm py-2 px-12 text-wrap`;

  if (!fullWidth) {
    switch (variant) {
      case "small":
        style = `bg-${backgroundColor}  rounded-sm py-2 px-8 text-wrap`;
        break;
      case "large":
        style = `bg-${backgroundColor} rounded-sm py-2 px-20  text-wrap`;
        break;

      default:
        style = `bg-${backgroundColor} rounded-sm py-2 px-12 text-wrap`;
    }
  }
  return (
    <button type={type} className={style} onClick={handleClick}>
      {children}
    </button>
  );
}
