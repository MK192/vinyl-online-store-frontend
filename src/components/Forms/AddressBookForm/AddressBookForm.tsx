import { Dispatch, SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

//components
import Button from "@components/Buttons/Button";
import FormInputText from "@components/Forms/FormInputText";
import FormCheckbox from "@components/Forms/FormCheckbox";
import SelectContainer from "./SelectContainer";

//type
import { EditAddressType } from "types/forms";
import { AddressType } from "types/general";

//context
import { UserContextValue } from "@context/UserContex";

//request
import { editUserAddress, addUserAddress } from "requests/userRequest";

//schema
import { editAddressFormSchema } from "@schema/formSchemas";

type Props = {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  address?: AddressType;
  isEdit?: boolean;
};

export default function AddressBookForm({
  setIsFormOpen,
  address,
  isEdit = true,
}: Props) {
  // const {
  //   apartment,
  //   city,
  //   company,
  //   country,
  //   firstName,
  //   isDefault,
  //   lastName,
  //   phone,
  //   postalCode,
  //   state,
  //   streetAddress,
  //   _id,
  // } = address;
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
      firstName: address?.firstName ?? "",
      lastName: address?.lastName ?? "",
      apartment: address?.apartment ?? "",
      city: address?.city ?? "",
      company: address?.company ?? "",
      country: address?.country ?? "",
      isDefault: address?.isDefault ?? false,
      phone: address?.phone ?? "",
      postalCode: address?.postalCode ?? "",
      state: address?.state ?? "",
      streetAddress: address?.streetAddress ?? "",
    },
  });
  console.log(address?._id);
  // Tanstack query
  const _id = address?._id ?? " ";
  const mutation = useMutation({
    mutationFn: async (formData: EditAddressType, id?: string) => {
      return isEdit
        ? editUserAddress({ _id, formData })
        : addUserAddress(formData);
    },
    onSuccess: (data) => {
      if (data) {
        setLogedUserData(data);
        setIsFormOpen(false);
      }
    },
  });

  const title = isEdit ? "Edit Address" : "Add Address";

  console.log(errors);
  return (
    <form
      className="p-4 border-2 border-absenceOfColor"
      onSubmit={handleSubmit((formData) => mutation.mutate({ formData, _id }))}
    >
      <h2 className="text-xl text-gray-300 font-bold">{title}</h2>
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
        <SelectContainer
          control={control}
          countryDefaultValue={address?.country ?? ""}
          stateDefaultValue={address?.state ?? ""}
          countryErrorMessage={errors.country?.message}
          stateErrorMessage={errors.state?.message}
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
