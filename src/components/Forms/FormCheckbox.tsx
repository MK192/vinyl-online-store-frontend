import { ReactNode, forwardRef } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
};

export default forwardRef<HTMLInputElement, Props>(function FormCheckbox(
  { children, ...other }: Props,
  ref
) {
  return (
    <div className="flex gap-4">
      <input
        type="checkbox"
        className={`${clsx("w-5 rounded-sm  accent-absenceOfColor")}`}
        ref={ref}
        {...other}
      />
      {children}
    </div>
  );
});
