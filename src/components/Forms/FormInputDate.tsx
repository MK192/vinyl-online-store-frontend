import { forwardRef } from "react";

type Props = {
  labelText: string;
  defaultDate?: string;
  height?: string;
  width?: string;
};

export default forwardRef<HTMLInputElement, Props>(function FormInputDate(
  {
    labelText,
    defaultDate,
    width = "w-full",
    height = "h-auto",
    ...other
  }: Props,
  ref
) {
  return (
    <div>
      <label className="flex flex-col font-semibold w-full">
        {labelText}
        <input
          ref={ref}
          {...other}
          type="date"
          className={`bg-absenceOfColor p-2 rounded-sm ${width} ${height}`}
          defaultValue={defaultDate}
        />
      </label>
    </div>
  );
});
