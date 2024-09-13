import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

// components
import FormInputText from "./FormInputText";
import FormCheckbox from "./FormCheckbox";
import UserRegistered from "./UserRegistred";
import FormButton from "@components/Buttons/FormButton";

//type
import { RegistrationType } from "types/forms";

//schema
import { registrationFormSchema } from "@schema/registrationFormSchema";

//request
import { registerUser } from "requests/userRequest";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationType>({
    resolver: zodResolver(registrationFormSchema),
  });

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
          <div className="flex justify-center flex-wrap gap-6 w-full pt-8">
            <FormInputText
              labelText="First Name"
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <FormInputText
              labelText="Last Name"
              {...register("lastName")}
              error={errors.lastName?.message}
            />
          </div>
          <div className="flex justify-center flex-wrap gap-6 w-full pt-8">
            <FormInputText
              labelText="Email"
              {...register("email")}
              error={errors.email?.message}
            />
            <FormInputText
              labelText="Password"
              {...register("password")}
              error={errors.password?.message}
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <FormCheckbox {...register("terms")}>
              <p>I accept the terms and conditions</p>
            </FormCheckbox>
            <FormButton type="submit">Submit</FormButton>
          </div>
          {isPending && <p>Submiting Data</p>}
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
      )}
    </div>
  );
}
