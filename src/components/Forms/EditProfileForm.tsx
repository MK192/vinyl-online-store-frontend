import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

//components
import Button from "@components/Buttons/Button";
import FormInputText from "./FormInputText";
import FormInputDate from "./FormInputDate";
import ProfileDropzone from "pages/UserProfile/ProfileDropzone";

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
      className="flex flex-col gap-8 items-center md:items-start"
      onSubmit={handleSubmit((formData: EditUserProfileType) =>
        editProfile({
          currentProfile: profile,
          editedProfile: formData,
          imageFile,
          removeProfileImage,
        })
      )}
    >
      <div className="w-full sm:w-8/12 md:w-full flex flex-col gap-8 ">
        <h2 className="text-gray-300 text-3xl md:text-start font-semibold ">
          Edit Profile
        </h2>
        <FormInputText
          width="md:w-8/12"
          labelText="First name"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <FormInputText
          width="md:w-8/12"
          labelText="Last Name"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
        <FormInputDate
          width="w-8/12 md:w-6/12"
          labelText="Birthday"
          {...register("birthday")}
          defaultDate={defaultBirthday}
        />
        <div className="w-8/12">
          <ProfileDropzone
            text="Click or drop files here"
            profile={profile}
            setImageFile={setImageFile}
            setRemoveProfileImage={setRemoveProfileImage}
          />
        </div>
        <div>
          <Button type="submit">
            <p> Apply Changes</p>
          </Button>
          {isPending && <p>Sending Data</p>}
          {isError && <p className="text-red-500">{`${error}`}</p>}
        </div>
      </div>
    </form>
  );
}
