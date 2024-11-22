import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

//components
import Button from "@components/Buttons/Button";
import FormInputText from "./FormInputText";

//request
import { changePassword } from "requests/userRequest";

//type
import { ChangePasswordFormType } from "types/forms";

//schema
import { changePasswordFormSchema } from "@schema/formSchemas";

export default function ChangePasswordForm() {
  // React-hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(changePasswordFormSchema),
  });

  // Tanstack query
  const {
    mutate: changeUserPassword,
    isError,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: changePassword,
  });

  return (
    <form
      className="flex flex-col gap-8  items-center md:items-start"
      onSubmit={handleSubmit((formData) => {
        changeUserPassword([formData.currentPassword, formData.newPassword]);
      })}
    >
      <div className="w-full sm:w-8/12 md:w-full flex flex-col gap-8 ">
        <h2 className="text-gray-300 text-3xl  font-semibold ">
          Change Password
        </h2>
        <FormInputText
          width="md:w-8/12"
          type="password"
          labelText="Current Password"
          {...register("currentPassword")}
          error={errors.currentPassword?.message}
        />
        <FormInputText
          width="md:w-8/12"
          type="password"
          labelText="New Password"
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />
        <div>
          <Button type="submit">
            <p>Apply Changes</p>
          </Button>
        </div>
        <div className="text-lg">
          {isPending && <p>Sending Data</p>}
          {isSuccess && <p className="text-green-600">Password is changed!</p>}
          {isError && <p className="text-red-500">{`${error}`}</p>}
        </div>
      </div>
    </form>
  );
}
