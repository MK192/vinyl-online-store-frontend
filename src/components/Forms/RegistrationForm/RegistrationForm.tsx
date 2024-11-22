import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

// components
import Button from "@components/Buttons/Button";
import FormInputText from "@components/Forms/FormInputText";
import FormCheckbox from "@components/Forms/FormCheckbox";
import UserRegistered from "./UserRegistred";

//type
import { RegistrationFormType } from "types/forms";

//schema
import { registrationFormSchema } from "@schema/formSchemas";

//request
import { registerUser } from "requests/userRequest";

export default function RegistrationForm() {
  // React Hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormType>({
    resolver: zodResolver(registrationFormSchema),
  });

  // Tanstack Query
  const {
    mutate: userRegistration,
    isError,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: registerUser,
  });

  return (
    <div className="w-full md:w-5/12   ">
      {isSuccess ? (
        <UserRegistered />
      ) : (
        <form
          className="flex flex-col items-center justify-center gap-4 w-full p-4 md:border-2 border-absenceOfColor rounded-lg"
          onSubmit={handleSubmit((formValues) => {
            console.log(formValues);
            userRegistration(formValues);
          })}
        >
          <h1>Registration Form</h1>
          <hr className=" border-absenceOfColor border-2 w-full" />
          <div className="flex justify-center flex-wrap gap-6  pt-8">
            <FormInputText
              width="w-56"
              labelText="First Name"
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <FormInputText
              width="w-56"
              labelText="Last Name"
              {...register("lastName")}
              error={errors.lastName?.message}
            />
          </div>
          <div className="flex justify-center flex-wrap gap-6 pt-8">
            <FormInputText
              width="w-56"
              labelText="Email"
              {...register("email")}
              error={errors.email?.message}
            />
            <FormInputText
              width="w-56"
              type="password"
              labelText="Password"
              {...register("password")}
              error={errors.password?.message}
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <FormCheckbox {...register("terms")}>
              <p>I accept the terms and conditions</p>
            </FormCheckbox>
            <Button type="submit" variant="large">
              Submit
            </Button>
          </div>
          {isPending && <p>Submiting Data</p>}
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
      )}
    </div>
  );
}
