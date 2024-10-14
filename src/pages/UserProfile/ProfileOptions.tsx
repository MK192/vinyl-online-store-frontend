import { useContext, useEffect } from "react";

//components
import OrderHistory from "./OrderHistory";
import { MemoizedProfile } from "./Profile";

//context
import { UserContextValue } from "@context/UserContex";

//enums
import { EProfile_Page_Options } from "enums/enums";
import { getUser } from "requests/userRequest";

type Props = {
  selectedOption: string;
};
export default function ProfileOptions({ selectedOption }: Props) {
  const { logedUserData, setLogedUserData } = useContext(UserContextValue);
  useEffect(() => {
    async function getUserData() {
      const userData = await getUser();
      setLogedUserData(userData);
    }
    getUserData();
  }, []);

  switch (selectedOption) {
    case EProfile_Page_Options.ORDER_HISTORY:
      return <OrderHistory />;

    case EProfile_Page_Options.ADDRESS_BOOK:
      return <p>Address Book</p>;
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
