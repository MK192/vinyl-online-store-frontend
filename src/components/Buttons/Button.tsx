import { ComponentProps, forwardRef, ReactNode } from "react";

type Props = {
  backgroundColor?: string;
  textColor?: string;
  type?: "submit" | "reset" | "button";
  fullWidth?: boolean;
  handleClick?: () => void;
  disabled?: boolean;
  variant?: "content" | "small" | "medium" | "large";
  children: ReactNode;
};

export default forwardRef<HTMLButtonElement, ComponentProps<"button"> & Props>(
  function Button(
    {
      backgroundColor = "absenceOfColor",
      textColor = "white",
      type = "button",
      fullWidth = false,
      disabled = false,
      variant = "medium",
      children,
      ...props
    }: Props,
    ref
  ) {
    let style = fullWidth
      ? `bg-${backgroundColor} text-${textColor} rounded-sm p-2 w-full text-wrap`
      : `bg-${backgroundColor} text-${textColor} rounded-sm py-2 px-12 text-wrap`;

    if (!fullWidth) {
      switch (variant) {
        case "content":
          style = `bg-${backgroundColor}  text-${textColor} rounded-sm py-2 px-0 text-wrap`;
          break;
        case "small":
          style = `bg-${backgroundColor}  text-${textColor} rounded-sm py-2 px-8 text-wrap`;
          break;
        case "large":
          style = `bg-${backgroundColor}  text-${textColor} rounded-sm py-2 px-20  text-wrap`;
          break;

        default:
          style = `bg-${backgroundColor}  text-${textColor} rounded-sm py-2 px-12 text-wrap`;
      }
    }
    return (
      <button
        type={type}
        ref={ref}
        className={style}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);
