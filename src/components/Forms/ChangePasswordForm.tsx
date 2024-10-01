import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//components
import Button from "@components/Buttons/Button";
import FormInputText from "./FormInputText";

//request
import { changePassword } from "requests/userRequest";

//type
import { ChangePasswordType } from "types/forms";

//schema
import { changePasswordFormSchema } from "@schema/formSchemas";
import { useMutation } from "@tanstack/react-query";

export default function ChangePasswordForm() {
  // React-hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordType>({
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
      className="flex flex-col gap-6 w-8/12 "
      onSubmit={handleSubmit((formData) => {
        changeUserPassword([formData.currentPassword, formData.newPassword]);
      })}
    >
      <FormInputText
        type="password"
        labelText="Current Password"
        {...register("currentPassword")}
        error={errors.currentPassword?.message}
      />
      <FormInputText
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
    </form>
  );
}
