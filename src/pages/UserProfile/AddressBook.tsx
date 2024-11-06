//components
import AddressCard from "./AddressCard";
import AddAddress from "./AddAddress";

//type
import { LogedUserType } from "types/user";
import { AddressType } from "types/general";

type Props = {
  profile: LogedUserType | null;
};

export default function AddressBook({ profile }: Props) {
  console.log(profile);
  // const adres = [
  //   {
  //     apartment: "",
  //     firstName: "Darko",
  //     lastName: "Milicic",
  //     isDefault: false,
  //     company: "Jabuke DM",
  //     phone: "018-229-5432",
  //     postalCode: "452231",
  //     country: "Serbia",
  //     city: "Novi Sad",
  //     streetAddress: "Novosadska",
  //     _id: "dasdsaasdfasfwrqw2345252",
  //   },
  //   {
  //     apartment: "",
  //     firstName: "Darko",
  //     lastName: "Milicic",
  //     isDefault: true,
  //     company: "",
  //     phone: "018-229-5432",
  //     postalCode: "452231",
  //     country: "Serbia",
  //     city: "Novi Sad",
  //     streetAddress: "Novosadska",
  //     _id: "dsdfsdfsfd",
  //   },
  //   {
  //     apartment: "dadasasdasdsdweweasdas ",
  //     firstName: "Darko",
  //     lastName: "Milicic",
  //     isDefault: false,
  //     company: "Jabuke Dm",
  //     phone: "018-229-5432",
  //     postalCode: "452231",
  //     country: "Serbia",
  //     city: "Novi Sad",
  //     streetAddress: "Novosadska",
  //     _id: "dfssdf",
  //   },
  // ];
  console.log("adres book rerender");
  return (
    <div className="w-full text-start md:w-9/12">
      <div className="flex flex-col gap-6 ">
        <h2 className="text-gray-300 text-3xl md:text-start font-semibold ">
          Address Book
        </h2>
        <div className="flex flex-wrap gap-3">
          {profile?.addresses.map((address: AddressType) => (
            <AddressCard address={address} key={address._id} />
          ))}
        </div>
        <AddAddress />
      </div>
    </div>
  );
}
