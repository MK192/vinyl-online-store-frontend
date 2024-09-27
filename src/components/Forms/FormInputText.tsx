import { forwardRef } from "react";

type Props = {
  labelText: string;
  error?: string;
  width?: string;
  height?: string;
  type?: "text" | "password";
};

export default forwardRef<HTMLInputElement, Props>(function FormInputText(
  {
    labelText,
    error,
    width = "w-full",
    height = "h-auto",
    type = "text",
    ...other
  }: Props,
  ref
) {
  return (
    <div className={`flex flex-col text-start ${width}`}>
      <label className="font-semibold flex flex-col">
        {labelText}

        <input
          type={type}
          className={`rounded bg-absenceOfColor px-2 ${height}`}
          ref={ref}
          {...other}
        />
      </label>
      {error && <span className="text-red-500 mr-auto">{error}</span>}
    </div>
  );
});
