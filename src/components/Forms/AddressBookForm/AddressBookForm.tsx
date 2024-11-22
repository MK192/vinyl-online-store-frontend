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
import { EditAddressFormType } from "types/forms";
import { UserAddressType } from "types/user";

//context
import { UserContextValue } from "@context/UserContex";

//request
import { editUserAddress, addUserAddress } from "requests/userRequest";

//schema
import { editAddressFormSchema } from "@schema/formSchemas";

type Props = {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  address?: UserAddressType;
};

export default function AddressBookForm({ setIsFormOpen, address }: Props) {
  const { setLogedUserData } = useContext(UserContextValue);

  // React-hook Form
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditAddressFormType>({
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

  // Tanstack query
  type Mutation = {
    formData: EditAddressFormType;
    _id?: string | null;
  };

  const _id = address?._id ?? null;
  const mutation = useMutation({
    mutationFn: ({ formData, _id }: Mutation) => {
      return _id
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

  const title = _id ? "Edit Address" : "Add Address";

  return (
    <form
      className="p-4 border-2 border-absenceOfColor min-w-full sm:min-w-[430px] md:min-w-[470px] w-5/12"
      onSubmit={handleSubmit((formData) =>
        _id ? mutation.mutate({ formData, _id }) : mutation.mutate({ formData })
      )}
    >
      <h2 className="text-xl text-gray-300 font-bold">{title}</h2>
      <div className="flex flex-col gap-4 my-8">
        <div className="flex flex-col gap-2 md:flex-row">
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
        <div className="flex flex-col gap-2 md:flex-row">
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
          setValue={setValue}
          control={control}
          countryDefaultValue={address?.country ?? ""}
          stateDefaultValue={address?.state ?? ""}
          countryErrorMessage={errors.country?.message}
          stateErrorMessage={errors.state?.message}
        />
        <div className="flex flex-col gap-2 md:flex-row">
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
          <FormCheckbox
            isDisabled={address?.isDefault}
            {...register("isDefault")}
          >
            <p>Default Address</p>
          </FormCheckbox>
        </div>
      </div>

      <div className=" flex gap-8">
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
