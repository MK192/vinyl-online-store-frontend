import { Dispatch, SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

//components
import Button from "@components/Buttons/Button";
import FormInputText from "./FormInputText";
import FormCheckbox from "./FormCheckbox";
import SelectContainer from "./AddressBookForm/SelectContainer";

//type
import { EditAddressType } from "types/forms";
import { AddressType } from "types/general";

//context
import { UserContextValue } from "@context/UserContex";

//request
import { editUserAddress } from "requests/userRequest";

//schema
import { editAddressFormSchema } from "@schema/formSchemas";

type Props = {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  address: AddressType;
};

export default function AddressBookForm({ setIsFormOpen, address }: Props) {
  const {
    apartment,
    city,
    company,
    country,
    firstName,
    isDefault,
    lastName,
    phone,
    postalCode,
    state,
    streetAddress,
    _id,
  } = address;
  const { setLogedUserData } = useContext(UserContextValue);

  // React-hook Form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditAddressType>({
    resolver: zodResolver(editAddressFormSchema),

    defaultValues: {
      firstName: firstName ?? " ",
      lastName: lastName ?? " ",
      apartment: apartment ?? " ",
      city: city ?? " ",
      company: company ?? " ",
      country: country ?? " ",
      isDefault: isDefault ?? false,
      phone: phone ?? " ",
      postalCode: postalCode ?? " ",
      state: state ?? " ",
      streetAddress: streetAddress ?? " ",
    },
  });

  // Tanstack query
  const {
    mutate: editAddress,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: editUserAddress,
    onSuccess: (data) => {
      if (data) {
        setLogedUserData(data);
      }
    },
  });

  return (
    <form
      className="p-4 border-2 border-absenceOfColor"
      onSubmit={handleSubmit((formData) => editAddress({ _id, formData }))}
    >
      <h2 className="text-xl text-gray-300 font-bold">Edit Address</h2>
      <div className="flex flex-col gap-4 my-8">
        <div className="flex gap-2">
          <FormInputText
            labelText="First Name"
            height="h-8"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <FormInputText
            labelText="Last Name"
            height="h-8"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>
        <div className="flex gap-2">
          <FormInputText
            labelText="Company (optional)"
            height="h-8"
            {...register("company")}
            error={errors.company?.message}
          />
          <FormInputText
            labelText="Phone (optional)"
            height="h-8"
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>

        <div>
          <FormInputText
            labelText="Apartment (optional)"
            height="h-8"
            {...register("apartment")}
            error={errors.apartment?.message}
          />
        </div>

        {/* <div className="flex gap-2">
          <SelectInput
            control={control}
            name="country"
            defaultValue={country}
            selectTitle="Country"
            optionsPromise={getCountries()}
          />

          <SelectInput
            control={control}
            name="state"
            defaultValue={state}
            selectTitle="State"
            optionsPromise={getStates(countryStates)}
          />
        </div> */}
        <SelectContainer
          control={control}
          countryDefaultValue={country}
          stateDefaultValue={state}
        />
        <div className="flex gap-2">
          <FormInputText
            labelText="City"
            height="h-8"
            {...register("city")}
            error={errors.city?.message}
          />
          <FormInputText
            labelText="Postal Code"
            height="h-8"
            {...register("postalCode")}
            error={errors.postalCode?.message}
          />
        </div>
        <div>
          <FormInputText
            labelText="Street"
            height="h-8"
            {...register("streetAddress")}
            error={errors.streetAddress?.message}
          />
        </div>
        <div className="self-end">
          <FormCheckbox {...register("isDefault")}>
            <p>Default Address</p>
          </FormCheckbox>
        </div>
      </div>

      <div className="flex gap-8">
        <Button
          backgroundColor="transparent"
          variant="content"
          handleClick={() => setIsFormOpen(false)}
        >
          Cancel
        </Button>
        <Button type="submit">Confirm</Button>
      </div>
    </form>
  );
}
