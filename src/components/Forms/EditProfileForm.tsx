import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

//components
import Button from "@components/Buttons/Button";
import FormInputText from "./FormInputText";
import FormInputDate from "./FormInputDate";
import Dropzone from "@components/Dropzone";

//type
import { LogedUserType } from "types/user";
import { EditUserProfileType } from "types/forms";

//request
import { editUserProfile } from "requests/userRequest";

//schema
import { editProfileSchema } from "@schema/formSchemas";

type Props = {
  profile: LogedUserType | null;
  setLogedUserData: React.Dispatch<React.SetStateAction<LogedUserType | null>>;
};
export default function EditProfileForm({ profile, setLogedUserData }: Props) {
  const [imageFile, setImageFile] = useState<null | Blob[]>(null);
  const [removeProfileImage, setRemoveProfileImage] = useState(false);
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
    onSuccess: (data) => {
      if (data) setLogedUserData(data);
      setImageFile(null);
      setRemoveProfileImage(false);
    },
  });
  const defaultBirthday =
    profile?.birthday === "" ? "1990-01-01" : profile?.birthday;

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit((formData: EditUserProfileType) =>
        editProfile([
          profile as LogedUserType,
          formData,
          imageFile as Blob[],
          removeProfileImage,
        ])
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
        <FormInputDate
          width="w-5/12"
          labelText="Birthday"
          {...register("birthday")}
          defaultDate={defaultBirthday}
        />
      </div>
      {/* <div className="relative w-20">
        <ProfileImage imageURL={imageUrl} width="w-20" height="h-20" />
        <div className="absolute top-1 right-1 z-50">
          <XCircleIcon
            className="size-6 text-gray-500 cursor-pointer"
            onClick={() => {
              deleteProfileImage();
              setImageUrl("");
            }}
          />
        </div>
      </div> */}
      {/* 
      {/* <Dropzone
        onDrop={(acceptedFiles: Blob[]) => {
          setImageFile(acceptedFiles);
          console.log(acceptedFiles);
          setImageUrl(URL.createObjectURL(acceptedFiles[0]));
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Click or drag image here to change profile picture</p>
            </div>
          </section>
        )}
      </Dropzone> */}
      <Dropzone
        profile={profile}
        setImageFile={setImageFile}
        setRemoveProfileImage={setRemoveProfileImage}
      />

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
