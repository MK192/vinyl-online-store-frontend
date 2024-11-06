import { useContext } from "react";

//components
import OrderHistory from "./OrderHistory";
import { MemoizedProfile } from "./Profile";
import AddressBook from "./AddressBook";

//context
import { UserContextValue } from "@context/UserContex";

//enums
import { EProfile_Page_Options } from "enums/enums";

type Props = {
  selectedOption: string;
};
export default function ProfileOptions({ selectedOption }: Props) {
  const { logedUserData, setLogedUserData } = useContext(UserContextValue);

  switch (selectedOption) {
    case EProfile_Page_Options.ORDER_HISTORY:
      return <OrderHistory />;

    case EProfile_Page_Options.ADDRESS_BOOK:
      return <AddressBook profile={logedUserData} />;
    case EProfile_Page_Options.PROFILE:
      return (
        <MemoizedProfile
          profile={logedUserData}
          setLogedUserData={setLogedUserData}
        />
      );
    default:
      return <OrderHistory />;
  }
}
