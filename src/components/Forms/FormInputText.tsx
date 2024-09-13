import { forwardRef } from "react";

type Props = {
  labelText: string;
  error?: string;
};

export default forwardRef<HTMLInputElement, Props>(function FormInputText(
  { labelText, error, ...other }: Props,
  ref
) {
  return (
    <div className="w-56 flex flex-col text-start">
      <label className=" font-semibold">
        {labelText}

        <input
          type="text"
          className="rounded bg-absenceOfColor px-2"
          ref={ref}
          {...other}
        />
      </label>
      {error && <span className="text-red-500 mr-auto">{error}</span>}
    </div>
  );
});
