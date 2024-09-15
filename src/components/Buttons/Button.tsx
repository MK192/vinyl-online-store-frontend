import { ReactNode } from "react";

type Props = {
  backgroundColor?: string;
  type?: "submit" | "reset" | "button";
  handleClick?: () => void;
  children: ReactNode;
};

export default function Button({
  backgroundColor = "absenceOfColor",
  type = "button",
  handleClick,
  children,
}: Props) {
  return (
    <button
      type={type}
      className={`w-full bg-${backgroundColor} rounded-sm p-2 `}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
