import { ReactNode, forwardRef } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  isDisabled?: boolean;
};

export default forwardRef<HTMLInputElement, Props>(function FormCheckbox(
  { children, isDisabled = false, ...other }: Props,
  ref
) {
  return (
    <div className="flex gap-4">
      <input
        type="checkbox"
        className={`${clsx("w-5 rounded-sm  accent-absenceOfColor")}`}
        ref={ref}
        disabled={isDisabled}
        {...other}
      />
      {children}
    </div>
  );
});
