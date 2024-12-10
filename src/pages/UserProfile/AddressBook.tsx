//components
import AddressCard from "./AddressCard";
import AddAddress from "./AddAddress";

//type
import { LogedUserType, UserAddressType } from "types/user";
type Props = {
  profile: LogedUserType | null;
};

export default function AddressBook({ profile }: Props) {
  return (
    <div className="w-full text-start md:w-9/12">
      <div className="flex flex-col gap-6 ">
        <h2 className="text-gray-300 text-3xl md:text-start font-semibold ">
          Address Book
        </h2>
        <div className="flex flex-wrap gap-3">
          {profile?.addresses.map((address: UserAddressType) => (
            <AddressCard address={address} key={address._id} />
          ))}
        </div>
        <AddAddress />
      </div>
    </div>
  );
}
