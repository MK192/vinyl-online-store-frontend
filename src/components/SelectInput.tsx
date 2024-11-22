import { useEffect, useState } from "react";
import { Control, FieldValues, useController, Path } from "react-hook-form";
import Select from "react-select";

// type
import { ReactSelectOptions } from "types/general";

interface Props<T extends FieldValues> {
  control: Control<T>;
  defaultValue: string | null;
  name: Path<T>;
  selectTitle: string;
  options: ReactSelectOptions[];
  error: string | undefined;
}

export default function SelectInput<T extends FieldValues>({
  defaultValue,
  control,
  name,
  selectTitle,
  options,
  error,
}: Props<T>) {
  const [selected, setSelected] = useState<ReactSelectOptions | null>(null);
  const { field } = useController({
    name,
    control,
  });

  useEffect(() => {
    if (options) {
      const filterVal = options.find((c) => c.label === defaultValue);
      const defaultOption = filterVal ? filterVal : null;
      setSelected(defaultOption);
      handleChange(defaultOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, options]);

  const handleChange = (selectedOption: ReactSelectOptions | null) => {
    field.onChange(selectedOption ? selectedOption?.label : "");
    setSelected(selectedOption);
  };

  return (
    <div className="flex flex-col w-full">
      <p>{selectTitle}</p>
      <Select
        {...field}
        name={field.name}
        value={selected}
        options={options}
        onChange={handleChange}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "#16151c",
            border: "1px solid white",
            boxShadow: "none",
            "&:hover": {
              border: "1px solid white",
            },
          }),
          option: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "#16151c",
            color: "white",
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "white",
          }),
        }}
      />
      {error && (
        <div>
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
