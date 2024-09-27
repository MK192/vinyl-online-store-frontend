//components
import EditProfileForm from "@components/Forms/EditProfileForm";
import ChangePasswordForm from "@components/Forms/ChangePasswordForm";

//type
import { LogedUserType } from "types/user";

type Props = {
  profile: LogedUserType | null;
  setLogedUserData: React.Dispatch<React.SetStateAction<LogedUserType | null>>;
};
export default function Profile({ profile, setLogedUserData }: Props) {
  return (
    <div className="w-9/12 p-12 text-start ">
      <div className="flex flex-col gap-11 items-start lg:flex-row">
        <div className="w-full lg:w-6/12">
          <h2 className="text-gray-300 text-3xl font-semibold mb-6">
            Edit Profile
          </h2>
          <EditProfileForm
            profile={profile}
            setLogedUserData={setLogedUserData}
          />
        </div>

        <div className="w-full lg:w-6/12">
          <h2 className="text-gray-300 text-3xl font-semibold mb-6">
            Change Password
          </h2>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
