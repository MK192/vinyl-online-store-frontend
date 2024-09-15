import { useContext, useEffect } from "react";

//components
import OrderHistory from "./OrderHistory";
import Profile from "./Profile";

//context
import { UserContextValue } from "@context/UserContex";

//request
import { getUser } from "requests/userRequest";

type Props = {
  selectedOption: string;
};
export default function ProfileOption({ selectedOption }: Props) {
  const { logedUserData, setLogedUserData } = useContext(UserContextValue);
  useEffect(() => {
    async function getUserData() {
      const userData = await getUser();
      setLogedUserData(userData);
    }
    getUserData();
  }, []);

  switch (selectedOption) {
    case "order-history":
      return <OrderHistory />;

    case "address-book":
      return <p>Address Book</p>;
    case "profile":
      return <Profile />;
  }
}
