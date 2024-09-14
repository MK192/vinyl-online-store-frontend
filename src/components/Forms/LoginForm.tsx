import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

//components
import FormButton from "@components/Buttons/FormButton";
import FormInputText from "./FormInputText";

//request
import { loginUser } from "requests/userRequest";

//type
import { LoginType } from "types/forms";

//schema
import { loginFormSchema } from "@schema/loginFormSchema";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginFormSchema),
  });
  const navigate = useNavigate();

  const {
    mutate: userLogin,
    data: userData,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/user-profile");
    },
  });
  console.log(userData);
  return (
    <div className="w-full md:w-5/12   ">
      <form
        className="flex flex-col items-center justify-center gap-4 w-full p-4 md:border-2 border-absenceOfColor rounded-lg"
        onSubmit={handleSubmit((formValues) => {
          userLogin(formValues);
        })}
      >
        <h1>Login Form</h1>
        <hr className=" border-absenceOfColor border-2 w-full" />
        <div className="flex flex-col items-center justify-center flex-wrap gap-6 w-full pt-4  md:flex-row md:items-start">
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
        <div className="w-32 pt-4">
          <FormButton type="submit">Login</FormButton>
        </div>
        {isPending && <p>Processing ...</p>}
        {isError && <p className="text-red-500">{error.message}</p>}
      </form>
    </div>
  );
}
