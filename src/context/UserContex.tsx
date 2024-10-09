import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

//type
import { LogedUserType } from "types/user";

type UserContextValueType = {
  logedUserData: null | LogedUserType;
  setLogedUserData: Dispatch<SetStateAction<LogedUserType | null>>;
};

export const UserContextValue = createContext<UserContextValueType>({
  logedUserData: null,
  setLogedUserData: function (): void {
    throw new Error("Function not implemented.");
  },
});

type Props = {
  children: ReactNode;
};

const UserContext = ({ children }: Props) => {
  const [logedUserData, setLogedUserData] = useState<null | LogedUserType>(
    null
  );

  return (
    <UserContextValue.Provider value={{ logedUserData, setLogedUserData }}>
      {children}
    </UserContextValue.Provider>
  );
};

export default UserContext;
