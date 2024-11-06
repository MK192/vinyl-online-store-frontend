import { useEffect, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import Select from "react-select";

// type
import { ReactSelectOptions } from "types/general";

type Props = {
  defaultValue: string | null;
  control: UseControllerProps<any>;
  name: string;
  selectTitle: string;
  options: ReactSelectOptions[];
  error: string | undefined;
};

export default function SelectInput({
  defaultValue,
  control,
  name,
  selectTitle,
  options,
  error,
}: Props) {
  // const [options, setOptions] = useState<Options[]>([]);
  const [selected, setSelected] = useState<
    ReactSelectOptions | null | undefined
  >(null);

  const { field } = useController({
    name,
    control,
  });

  // useEffect(() => {
  //   const fetchOptions = async () => {
  //     const res = await fetchFunction();
  //     const defaultCountry = defaultValue
  //       ? res.find((c) => c.label === defaultValue)
  //       : res[0];

  //     setOptions(res);
  //     setSelected(defaultCountry);
  //   };

  //   fetchOptions();
  // }, [defaultValue, fetchFunction]);

  // useEffect(() => {
  //   const resolveFetch = async () => {
  //     const res = await optionsPromise;
  //     const defaultVal = defaultValue
  //       ? res.find((c: Options) => c.label === defaultValue)
  //       : res[0];

  //     setOptions(res);
  //     setSelected(defaultVal);
  //   };
  //   resolveFetch();
  // }, [optionsPromise]);

  useEffect(() => {
    if (options) {
      const defaultOption = defaultValue
        ? options.find((c) => c.label === defaultValue)
        : undefined;

      setSelected(defaultOption);
    }
  }, [defaultValue, options]);

  const handleChange = (selectedOption: ReactSelectOptions | null) => {
    field.onChange(selectedOption?.label);
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
            border: "none",
            backgroundColor: "#16151c",
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
