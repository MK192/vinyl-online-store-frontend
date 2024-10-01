import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { XCircleIcon } from "@heroicons/react/16/solid";

//components
import ProfileImage from "./ProfileImage";

//type
import { LogedUserType } from "types/user";

type Props = {
  profile: LogedUserType | null;
  setImageFile: (acceptedFiles: Blob[] | null) => void;
  setRemoveProfileImage: (removeProfileImage: boolean) => void;
};

export default function Dropzone({
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
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFileURL(URL.createObjectURL(acceptedFiles[0]));
      setImageFile(acceptedFiles);
    },
  });

  useEffect(() => {
    return () => URL.revokeObjectURL(fileURL as string);
  }, []);

  return (
    <section className="flex flex-col gap-4 ">
      <div className="relative w-20">
        <ProfileImage
          imageURL={fileURL ?? imageURL}
          width="w-20"
          height="h-20"
          onLoad={() => {
            URL.revokeObjectURL(fileURL as string);
          }}
        />
        <XCircleIcon
          className="size-6 bg-absenceOfColor text-gray-400  rounded-full cursor-pointer absolute top-1 right-1"
          onClick={() => {
            setImageFile(null);
            setFileURL("blank-user.png");
            setRemoveProfileImage(true);
          }}
        />
      </div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  );
}
