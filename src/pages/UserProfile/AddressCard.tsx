import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";

//component
import Button from "@components/Buttons/Button";
import { AddressBookForm } from "@components/Forms/AddressBookForm";

//context
import { UserContextValue } from "@context/UserContex";

//type
import { AddressType } from "types/general";

//request
import { deleteUserAddress } from "requests/userRequest";

type Props = {
  address: AddressType;
};

export default function AddressCard({ address }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { logedUserData, setLogedUserData } = useContext(UserContextValue);

  // Tanstack query
  const {
    mutate: deleteAddress,
    isError,
    error,
  } = useMutation({
    mutationFn: deleteUserAddress,
    onSuccess: (data) => {
      setLogedUserData(data);
    },
  });

  const numberOfAddresses = logedUserData?.addresses.length ?? 0;
  const isButtonDisabled = numberOfAddresses <= 1 ? true : false;

  return (
    <>
      {isFormOpen ? (
        <AddressBookForm setIsFormOpen={setIsFormOpen} address={address} />
      ) : (
        <div className="flex flex-col p-6 border-2 border-absenceOfColor w-5/12  break-words justify-between min-h-52">
          <div className="flex justify-between">
            <p>
              {`${address.firstName} ${address.lastName}`}{" "}
              <span className="text-gray-300">{address.company}</span>
            </p>
            {address.isDefault && <p className="text-orange-300">Default</p>}
          </div>
          <p className="">
            {address.streetAddress}
            <span className="text-gray-300"> {address.apartment}</span>
          </p>
          <p>
            {address.city}{" "}
            <span className="text-gray-300">{address.postalCode}</span>
          </p>
          <p>
            {address.country}{" "}
            <span className="text-gray-300">{address.state}</span>
          </p>
          <div className="flex gap-7">
            <Button
              backgroundColor="transparant"
              variant="content"
              handleClick={() => setIsFormOpen(true)}
            >
              Edit
            </Button>
            <Button
              backgroundColor="transparant"
              variant="content"
              handleClick={() => deleteAddress(address._id)}
              disabled={isButtonDisabled}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
