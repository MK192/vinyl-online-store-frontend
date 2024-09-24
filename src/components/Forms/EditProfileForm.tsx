import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Dropzone from "react-dropzone";

//components
import Button from "@components/Buttons/Button";
import FormInputText from "./FormInputText";
import FormInputDate from "./FormInputDate";
import ProfileImage from "@components/ProfileImage";

//type
import { EditUserProfileType, LogedUserType } from "types/user";

//request
import { editUserProfile } from "requests/userRequest";

//schema
import { editProfileSchema } from "@schema/editProfileSchema";

type Props = {
  profile: LogedUserType | null;
};
export default function EditProfileForm({ profile }: Props) {
  const [imageFile, setImageFile] = useState<null | unknown>(null);
  // React-hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserProfileType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: profile?.firstName ?? " ",
      lastName: profile?.lastName ?? " ",
    },
  });

  // Tanstack query
  const {
    mutate: editProfile,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: editUserProfile,
  });
  const defaultBirthday =
    profile?.birthday === "" ? "1990-01-01" : profile?.birthday;

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit((formData: EditUserProfileType) =>
        editProfile([profile as LogedUserType, formData, imageFile])
      )}
    >
      <div className="flex flex-col items-start justify-center flex-wrap gap-6 md:items-start md:justify-start">
        <FormInputText
          width="w-8/12"
          labelText="First name"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <FormInputText
          width="w-8/12"
          labelText="Last Name"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
      </div>

      <FormInputDate
        width="w-5/12"
        labelText="Birthday"
        {...register("birthday")}
        defaultDate={defaultBirthday}
      />
      <div className="flex flex-col gap-4">
        <ProfileImage imageURL={profile?.profileImage} width="w-20" />
        <Dropzone
          onDrop={(acceptedFiles: unknown) => setImageFile(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Click or drag image to change profile picture</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      <div>
        <Button type="submit">
          <p> Apply Changes</p>
        </Button>
        {isPending && <p>Sending Data</p>}
        {isError && <p className="text-red-500">{`${error}`}</p>}
      </div>
    </form>
  );
}
