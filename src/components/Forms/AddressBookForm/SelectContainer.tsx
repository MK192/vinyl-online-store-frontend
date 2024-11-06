import { useQuery } from "@tanstack/react-query";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

//components
import SelectInput from "@components/SelectInput";

//request
import { getCountries, getStates } from "requests/countriesRequest";

//type
import { EditAddressType } from "types/forms";

type Props = {
  control: Control<EditAddressType>;
  countryDefaultValue: string;
  stateDefaultValue: string;
  countryErrorMessage: string | undefined;
  stateErrorMessage: string | undefined;
};

export default function SelectContainer({
  control,
  countryDefaultValue,
  stateDefaultValue,
  countryErrorMessage,
  stateErrorMessage,
}: Props) {
  const country = useWatch({
    control,
    name: "country",
    defaultValue: countryDefaultValue ?? "",
  });

  // Tanstack query
  const { data: countryOptions } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });
  const { data: stateOptions } = useQuery({
    queryKey: [country],
    queryFn: ({ queryKey }) => getStates(queryKey[0]),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    enabled: !!country,
  });

  // useEffect(() => {
  //   if (countryOptions?.length > 0 && !countryDefaultValue) {
  //     setValue("country", countryOptions[1].label);
  //   }
  // }, [countryDefaultValue, countryOptions, setValue]);

  // useEffect(() => {
  //   if (stateOptions?.length > 0 && !stateDefaultValue) {
  //     setValue("state", stateOptions[1].label);
  //   }
  // }, [setValue, stateDefaultValue, stateOptions]);
  return (
    <div className="flex gap-2">
      <SelectInput
        control={control}
        name="country"
        defaultValue={countryDefaultValue}
        selectTitle="Country"
        options={countryOptions}
        error={countryErrorMessage}
      />

      {stateOptions?.length > 0 && (
        <SelectInput
          control={control}
          name="state"
          defaultValue={stateDefaultValue}
          selectTitle="State"
          options={stateOptions}
          error={stateErrorMessage}
        />
      )}
    </div>
  );
}
