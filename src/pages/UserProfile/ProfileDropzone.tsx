import { useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/16/solid";

//components
import ProfileImage from "@components/ProfileImage";
import Dropzone from "@components/Dropzone";

//type
import { LogedUserType } from "types/user";

type Props = {
  profile: LogedUserType | null;
  setImageFile: (acceptedFiles: Blob[] | null) => void;
  setRemoveProfileImage: (removeProfileImage: boolean) => void;
};

export default function ProfileDropzone({
  profile,
  setImageFile,
  setRemoveProfileImage,
}: Props) {
  /* if new image is not droped,
   then current photo or default profil image is used for ProfilImage */
  const [fileURL, setFileURL] = useState<string | null>(null);
  const imageURL = profile?.profileImage
    ? `${import.meta.env.VITE_BASE_URL}${profile?.profileImage}`
    : null;

  useEffect(() => {
    return () => URL.revokeObjectURL(fileURL as string);
  }, []);

  return (
    <section className="flex flex-col gap-4 relative  ">
      <Dropzone
        onDrop={(acceptedFiles) => {
          setFileURL(URL.createObjectURL(acceptedFiles[0]));
          setImageFile(acceptedFiles);
        }}
      >
        <div className="w-full">
          <ProfileImage
            imageURL={fileURL ?? imageURL}
            width="w-20"
            height="h-20"
            onLoad={() => {
              URL.revokeObjectURL(fileURL as string);
            }}
          />
          <p>Click or drop image here</p>
        </div>
      </Dropzone>

      <XCircleIcon
        className="size-6 bg-absenceOfColor text-orange-300  rounded-full cursor-pointer absolute top-1 left-14"
        onClick={() => {
          setImageFile(null);
          setFileURL("blank-user.png");
          setRemoveProfileImage(true);
        }}
      />
    </section>
  );
}
