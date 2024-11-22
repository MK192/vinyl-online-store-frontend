import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

//components
import SelectInput from "@components/SelectInput";

//request
import { getCountries, getStates } from "requests/countriesRequest";

//type
import { EditAddressFormType } from "types/forms";

type Props = {
  setValue: UseFormSetValue<EditAddressFormType>;
  control: Control<EditAddressFormType>;
  countryDefaultValue: string;
  stateDefaultValue: string;
  countryErrorMessage: string | undefined;
  stateErrorMessage: string | undefined;
};

export default function SelectContainer({
  setValue,
  control,
  countryDefaultValue,
  stateDefaultValue,
  countryErrorMessage,
  stateErrorMessage,
}: Props) {
  const country = useWatch({
    control,
    name: "country",
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

  useEffect(() => {
    if (stateOptions?.length === 0) {
      setValue("state", null);
    }
  }, [setValue, stateOptions]);

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

      {stateOptions?.length > 0 ? (
        <SelectInput
          control={control}
          name="state"
          defaultValue={stateDefaultValue}
          selectTitle="State"
          options={stateOptions}
          error={stateErrorMessage}
        />
      ) : null}
    </div>
  );
}
