import { memo, useState } from "react";

//components
import EditProfileForm from "@components/Forms/EditProfileForm";
import ChangePasswordForm from "@components/Forms/ChangePasswordForm";

//type
import { LogedUserType } from "types/user";

type Props = {
  profile: LogedUserType | null;
  setLogedUserData: React.Dispatch<React.SetStateAction<LogedUserType | null>>;
};
function Profile({ profile, setLogedUserData }: Props) {
  console.log(profile);

  return (
    <div className="w-full text-start md:w-9/12">
      <div className="flex flex-col gap-11 lg:flex-row">
        <div className="w-full md:pl-9 lg:w-6/12 lg:pl-0 ">
          <EditProfileForm
            profile={profile}
            setLogedUserData={setLogedUserData}
          />
        </div>
        <div className="w-full md:pl-9 lg:w-6/12 lg:pl-0">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
export const MemoizedProfile = memo(Profile);
